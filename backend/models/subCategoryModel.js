import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'category',  // tên model của bảng Category
      required: true 
    },
  });

const subCategoryModel = mongoose.models.subcategory || mongoose.model('subcategory', subCategorySchema);

export default subCategoryModel;  