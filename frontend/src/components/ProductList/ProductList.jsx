import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem.jsx';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/list');
      setAllProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const remainingCount = allProducts.length - visibleCount;

  return (
    <div id="menu" className="bg-white shadow-md">
      <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
        <h2 className="text-2xl font-semibold leading-tight">Product List</h2>

        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 
                        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
          {allProducts.slice(0, visibleCount).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>

        {visibleCount < allProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="relative inline-flex items-center justify-center
                         px-4 py-2 border border-blue-500 text-blue-500 
                         rounded-md hover:bg-blue-50 focus:outline-none"
            >
              <span>Xem thêm {remainingCount} Laptop</span>
              <svg
                className="ml-2 w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;