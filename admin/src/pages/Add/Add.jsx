import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { containsValue } from "../../utils";


const Add = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // const isValid = containsValue(["update"], "add");
  // States cho sản phẩm
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getListSubCategory();
    }
  }, [selectedCategory]);
  const getListCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/category/list"
      );
      // setCategory(response.data.data)
      if (response.data.success) {
        setCategory(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedCategory(response.data.data[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getListSubCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/subCategory/list/${selectedCategory}`
      );
      // setCategory(response.data.data)
      if (response.data.success) {
        setSubCategory(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedSubCategory(response.data.data[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching subCategories:", error);
    }
  };
  const handleChange = (e) => {
    // e.target.value chứa giá trị của option được chọn
    setSelectedCategory(e.target.value);
    console.log("Selected value:", e.target.value);
  };

  const handleChangeSubCategory = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để gửi dữ liệu bao gồm file ảnh
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", selectedCategory);
    formData.append("subCategoryId", selectedSubCategory);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/add",
        formData
      );
      if (response.data.success) {
        toast.success("Sản phẩm được tạo thành công");
        // Reset form nếu cần
        setProductName("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        toast.error("Tạo sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Lỗi khi tạo sản phẩm");
    }
  };
  return (
      <form className="flex-col mx-10" onSubmit={handleSubmit}>
        <div className="mt-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product name
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover rounded-md mb-4 mx-auto"
                />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
  
        <div className="mt-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div className="mt-5">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product price
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div className="mt-5">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              onChange={(e) => handleChange(e)}
              value={selectedCategory}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {category.length > 0 ? (
                category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option value="">Loading categories...</option>
              )}
            </select>
          </div>
        </div>
  
        <div className="mt-2">
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            onChange={(e) => handleChangeSubCategory(e)}
            value={selectedSubCategory}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {subCategory.length > 0 ? (
              subCategory.map((subCat) => (
                <option key={subCat._id} value={subCat._id}>
                  {subCat.name}
                </option>
              ))
            ) : (
              <option value="">Loading subcategories...</option>
            )}
          </select>
        </div>
  
        <div className="mt-5 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              setProductName("");
              setDescription("");
              setPrice("");
              setImage(null);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
  );
};

export default Add;
