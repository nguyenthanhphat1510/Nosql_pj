import orderModel from "../models/orderModel.js";
import orderDetailModel from "../models/orderDetail.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createOrder = async (req, res) => {
  try {
    const { userId, items, address, payment, amount } = req.body;

    if (!userId || !items || !address || !payment || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const orderDetails = [];

    for (const item of items) {
      const product = await productModel.findById(item._id);
      if (!product) {
        return res.status(404).json({ message: `Product ${item._id} not found` });
      }

      const subTotal = (parseFloat(product.price) * item.quantity).toString();

      const orderDetail = await orderDetailModel.create({
        productId: item._id,
        quantity: item.quantity,
        price: product.price,
        subTotal: subTotal,
      });
      orderDetails.push(orderDetail._id);
    }

    const newOrder = new orderModel({
      userId,
      orderDetails,
      amount, // Dùng amount từ req.body thay vì tính lại
      address,
      status: "pending",
      payment,
    });

    const savedOrder = await newOrder.save();

    await orderDetailModel.updateMany(
      { _id: { $in: orderDetails } },
      { orderId: savedOrder._id }
    );

    const populatedOrder = await orderModel
      .findById(savedOrder._id)
      .populate("orderDetails")
      .populate("userId", "name email");

    res.status(201).json({ success: true, data: populatedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const listOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate({
        path: "orderDetails",
        populate: { path: "productId", select: "name price image" },
      })
      .populate("userId", "name email");

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Middleware xác thực token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: "Không có token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token không hợp lệ" });
  }
};

// API lấy danh sách đơn hàng
const listOrderByUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?._id; // Lấy userId từ token đã xác thực

    if (!userId) {
      return res.status(401).json({ success: false, message: "Không được phép" });
    }

    // Lọc đơn hàng theo userId
    const orders = await orderModel
      .find({ userId }) // Filter orders by userId
      .populate("orderDetails", "name price image"); // Populate orderDetails

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const OrderDetailByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params; // Lấy orderId từ params

    // Tìm đơn hàng dựa trên orderId
    const order = await orderModel
      .findById(orderId) // Sử dụng findById để tìm đơn hàng duy nhất
      .populate({
        path: "orderDetails",
        populate: { path: "productId", select: "name price image" } // Populate productId trong orderDetails
      })
      .populate("userId", "name email"); // Populate userId để lấy thông tin người dùng

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!order) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    // Trả về dữ liệu đơn hàng
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { createOrder, listOrder, listOrderByUser, authMiddleware, OrderDetailByOrderId };

