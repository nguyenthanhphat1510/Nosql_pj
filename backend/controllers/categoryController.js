import categoryModel from "../models/categoryModel.js";

const addCategory = async (req, res) => {
  const { name, description, status } = req.body;
  const category = new categoryModel({
    name: name,
    status: status,
  });
  try {
    await category.save();
    res.json({ success: true, status: 200, message: "Category Added" });
  } catch (error) {
    res.json({ success: false, status: 400, message: "Category Add Failed" });
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find();
    if (!category)
      return res.json({
        success: false,
        status: 404,
        message: "Category not found",
      });
    res.json({ success: true, status: 200, data: category });
  } catch (error) {
    res.json({ success: false, status: 400, message: "Server Error" });
    console.log(error);
  }
};

export { addCategory, getCategory };
