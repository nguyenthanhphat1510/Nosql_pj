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


export { addProduct, listProduct, listProductCategory, listProductSubCategory };

