import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from "react-toastify";
import axios from 'axios'

 const AddSubCategory = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState();
    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        getListCategory()
      }, [])
    const getListCategory = async () => {
        try {
        const response = await axios.get('http://localhost:3000/api/category/list')
        // setCategory(response.data.data)
        if(response.data.success) {
         setCategory(response.data.data)
         if(response.data.data.length > 0) {
          setSelectedCategory(response.data.data[0]._id) 
         }
        }
        } catch (error) {
        console.error('Error fetching categories:', error)
        }
    }
     const onChange = async (e) => {
      setName(e.target.value)
     }
     const handleChange = (e) => {
      // e.target.value chứa giá trị của option được chọn
      setSelectedCategory(e.target.value);
      console.log("Selected value:", e.target.value);
    };
    const subCategoryData = {
      name: name,
      categoryId: selectedCategory,
    };
    const handleSubmit = async (e) => {
      e.preventDefault();  
      const response = await axios.post('http://localhost:3000/api/subCategory/add', subCategoryData) 
       if(response.data.success){
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          } 
    }
  return (
    <form className="flex-col mx-10" onSubmit={handleSubmit}>
    <div className="mt-5">
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
       SubCategory Name
      </label>
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="name"
          onChange={(e)=> onChange(e)}
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div className="mt-5">
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Category
      </label>
      <div className="mt-2">
        <select
          id="category"
          name="category"
          onChange={(e)=> handleChange(e)}
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
    <button
        type="submit"
        className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white 
                   shadow-sm hover:bg-indigo-500 focus-visible:outline 
                   focus-visible:outline-2 focus-visible:outline-offset-2 
                   focus-visible:outline-indigo-600"
      >
        Save
      </button>
  </form>
  )
}
export default AddSubCategory
