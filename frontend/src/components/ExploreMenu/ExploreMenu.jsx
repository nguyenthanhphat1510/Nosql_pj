  import React, { useState, useEffect } from 'react';
  import exploreMenuImage from '../../assets/explore_menu.jpg';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faFilter } from '@fortawesome/free-solid-svg-icons';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';

  const ExploreMenu = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      getListCategory();
    }, []);

    const getListCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/list");
        // Giả sử dữ liệu nằm trong response.data.data
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Khi lựa chọn thay đổi, cập nhật state và chuyển hướng đến đường dẫn tuyệt đối dựa trên slug
    const handleCategoryChange = (event) => {
      const selectedSlug = event.target.value;
      setSelectedCategory(selectedSlug);
      navigate(`/${selectedSlug}`);
    };

    return (
      <div>
        <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-white">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Discover Your Next Smartphone
            </h1>
            <p className="text-gray-600 md:w-3/4">
              Explore our wide range of smartphones with cutting-edge technology,
              stunning designs, and exceptional performance. Whether you are
              looking for the latest flagship model or a budget-friendly device,
              we have something for everyone.
            </p>
            <button className="mt-4 px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 mt-8 md:mt-0">
            <img
              src={exploreMenuImage}
              alt="Food Dish"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="p-8 shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Explore Our Shop
          </h2>
          <p className="text-gray-600 mb-8">
            Browse through our various categories to find the perfect smartphone
            that suits your needs.
          </p>

          {/* Thanh chứa nút LỌC và Select */}
          <div className="mt-10 flex justify-end items-center mb-4 space-x-4">
            {/* Nút lọc */}
            <button className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100">
              <FontAwesomeIcon icon={faFilter} className="text-lg mr-2" />
              <span className="text-md font-semibold">LỌC</span>
            </button>

            {/* Select danh mục động */}
            <select
              className="p-2 w-64 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name} data-id={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>
    );
  };

  export default ExploreMenu;
