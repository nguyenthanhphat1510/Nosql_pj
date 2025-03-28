import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  const { name, description, price, image, categoryId, subCategoryId } = req.body;
  let image_filename = req.file ? req.file.filename : null; // Nếu không có file thì gán giá trị null
  const product = new productModel({
    name: name,
    image: image_filename,
    description: description,
    price: price,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
  });
  try {
    await product.save();
    res.json({ success: true, status: 200, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, status: 400, message: "Product Add Failed" });
    console.log(error);
  }
};

const listProduct = async (req, res) => {
  try {
    let query = {};
    const product = await productModel.find(query);
    res.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
}

const listRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    // Lấy thông tin sản phẩm hiện tại
    const currentProduct = await productModel.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Tìm các sản phẩm liên quan cùng categoryId, loại trừ sản phẩm hiện tại
    const relatedProducts = await productModel.find({
      $or: [
        { subCategoryId: currentProduct.subCategoryId },
      ],
      _id: { $ne: productId }, // Loại trừ sản phẩm hiện tại
    });

    res.status(200).json({ success: true, data: relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listProductCategory = async (req, res) => {
  try {
    // Lấy categoryId từ params của URL
    const { categoryId } = req.params;
    // Truy vấn sản phẩm dựa vào categoryId
    const products = await productModel.find({ categoryId });
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const listProductSubCategory = async (req, res) => {
  try {
    // Lấy subCategoryId từ params của URL
    const { subCategoryId } = req.params;
    // Truy vấn sản phẩm dựa vào subCategoryId
    const products = await productModel.find({ subCategoryId });
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


export { addProduct, listProduct, listProductCategory, listProductSubCategory, listProductById, listRelatedProducts };

