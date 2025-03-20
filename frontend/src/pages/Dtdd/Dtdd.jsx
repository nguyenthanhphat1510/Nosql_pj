import React, { useState, useEffect } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import axios from 'axios';
import exploreMenuImage from '../../assets/explore_menu.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Dtdd = () => {
  const [listProduct, setListProduct] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // Ban đầu không có lựa chọn nào ("" nghĩa là "Tất cả")
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const id = '67c80159ac62457da4aae7a4';

  // Khi component mount, load tất cả sản phẩm và danh sách subcategory
  useEffect(() => {
    getAllProducts();
    getListSubCategory();
  }, []);

  // API lấy tất cả sản phẩm
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/product/list/${id}`);
      setListProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  // API lấy danh sách subcategory
  const getListSubCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/subCategory/list/${id}`);
      if (response.data.success) {
        setSubCategory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching subCategories:", error);
    }
  };

  // API lấy sản phẩm theo subcategory
  const getListProductSub = async (subCatId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/product/listproductsub/${subCatId}`);
      setListProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
    }
  };

  // Khi người dùng thay đổi lựa chọn trong select
  const handleChangeSubCategory = (e) => {
    const value = e.target.value;
    setSelectedSubCategory(value);
    // Nếu chọn "Tất cả" (value rỗng) thì load lại tất cả sản phẩm,
    // nếu có chọn một subcategory cụ thể thì gọi API lọc sản phẩm theo subcategory đó.
    if (value === "") {
      getAllProducts();
    } else {
      getListProductSub(value);
    }
  };

  return (
    <div>
      <div
        className="mt-10 relative w-full h-48 bg-cover bg-center text-white flex items-center"
        style={{ backgroundImage: `url(${exploreMenuImage})` }}
      >
        <div className="ml-20 bg-black/10 px-4 py-2 rounded-lg">
          <h1 className="text-xl font-bold">All Phones</h1>
        </div>
      </div>
      <div className="mt-10 mb-4 flex flex-col lg:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full lg:w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
        <button
            onClick={() => {
              // Nếu muốn sử dụng nút LỌC thay vì lọc ngay khi chọn, bạn có thể di chuyển logic lọc ở đây.
              // Ví dụ:
              // if (selectedSubCategory === "") {
              //   getAllProducts();
              // } else {
              //   getListProductSub(selectedSubCategory);
              // }
            }}
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
          >
            <FontAwesomeIcon icon={faFilter} className="text-lg mr-2" />
            <span className="text-md font-semibold">LỌC</span>
          </button>
          <select
            className="p-2 w-64 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChangeSubCategory}
            value={selectedSubCategory}
          >
            <option value="">Tất cả</option>
            {subCategory.map((subCat) => (
              <option key={subCat._id} value={subCat._id}>
                {subCat.name}
              </option>
            ))}
          </select>
          {/* Nút LỌC có thể loại bỏ nếu bạn muốn lọc ngay khi chọn option */}
        
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
        {listProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dtdd;
