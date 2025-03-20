import orderModel from "../models/orderModel.js";

const createOrder = async (req, res) => {
    try {
        // Khởi tạo Order từ dữ liệu nhận được trong req.body
        const newOrder = new orderModel(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};



const listOrder = async (req, res) => {
  try {
    // Lấy tất cả các đơn hàng và populate trường userId để lấy thêm thông tin người dùng
    const orders = await orderModel.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export  {createOrder,listOrder};

