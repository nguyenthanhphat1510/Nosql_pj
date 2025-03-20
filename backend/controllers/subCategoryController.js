import subCategoryModel from "../models/subCategoryModel.js";

const addSubCategory = async (req,res) => {
    const { name,image, categoryId } = req.body;
    const subCategory = new subCategoryModel(
        {
            name: name,
            categoryId: categoryId
        }
    );   
    try {
        await subCategory.save();
        res.json({ success: true, status: 200, message: "subCategory Added" });
      } catch (error) {
        res.json({ success: false, status: 400, message: "subCategory Add Failed" });
        console.log(error);
      }
}

  const getSubCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const subCategory = await subCategoryModel.find({categoryId});
        res.json({ success: true, status: 200, data: subCategory });
    } catch (error) {
        res.json({ success: false, status: 400, message: "Server Error" });
        console.log(error);
    }
  
  }

export {addSubCategory,getSubCategory}