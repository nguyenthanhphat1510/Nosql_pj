import React, { useState } from "react";
import defaultProductImage from "../../assets/default_product.jpg";
import iphone_16 from "../../assets/iphone_16.jpg";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cartSlice";

const images = [
  iphone_16,
  defaultProductImage,
  defaultProductImage,
  defaultProductImage,
  defaultProductImage,
];

const ProductDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 min-h-screen">
      {/*
        Bố cục 2 cột (trên màn hình lớn):
        - Cột trái (700px): Chứa slider + đánh giá
        - Cột phải: Thông tin sản phẩm
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[700px_minmax(0,1fr)] gap-4">
        {/* CỘT TRÁI */}
        <div className="flex flex-col space-y-4">
          {/* SLIDER ĐIỆN THOẠI */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[480px] overflow-hidden rounded-xl  bg-white">
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full flex-shrink-0 object-cover"
                />
              ))}
            </div>
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Nút điều hướng trái/phải */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
              ❯
            </button>
          </div>

          {/* PHẦN ĐÁNH GIÁ BÊN DƯỚI ĐIỆN THOẠI */}
          <div className="bg-white p-4 rounded-xl ">
            <h2 className="text-xl font-semibold mb-2">Đánh Giá Khách Hàng</h2>
            <div className="space-y-4">
              {/* Review 1 */}
              <div className="border-b pb-3">
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-800 mr-2">
                    Nguyễn Văn A
                  </span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-600">
                  Điện thoại dùng rất mượt, camera đẹp, pin trâu. Rất hài lòng!
                </p>
              </div>
              {/* Review 2 */}
              <div className="border-b pb-3">
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-800 mr-2">
                    Trần Thị B
                  </span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
                <p className="text-gray-600">
                  Sản phẩm tốt, giá hơi cao nhưng xứng đáng. Sẽ ủng hộ tiếp.
                </p>
              </div>
              {/* Review 3 */}
              <div>
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-800 mr-2">
                    Lê Hoàng C
                  </span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-600">
                  Mình mua được vài tuần, dùng rất êm. Chơi game nặng không giật
                  lag.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: THÔNG TIN SẢN PHẨM */}
        {cartItems.map((item) => (
          <div className="flex flex-col rounded-xl shadow-2xl p-4 bg-white">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
             {item.name}
            </h1>
            <p className="text-xl md:text-2xl text-red-500 mb-4">
                {item.price
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)
                      : "N/A"}
            </p>

            {/* Giả lập các lựa chọn Dung lượng & Màu sắc */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-full border-2 border-blue-400 text-blue-600 bg-blue-50">
                  256GB
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-gray-700">
                  512GB
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-gray-700">
                  1TB
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1 rounded-full border-2 border-blue-400 text-blue-600 bg-blue-50">
                  Titan Sa Mạc
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-gray-700">
                  Titan trắng
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-gray-700">
                  Titan đen
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-gray-700">
                  Titan tự nhiên
                </button>
              </div>
            </div>

            {/* Nút Mua/Thêm Vào Giỏ */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  className="w-20 p-2 text-center outline-none rounded-l"
                />
              </div>
              <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition">
                Thêm Vào Giỏ
              </button>
            </div>

            {/* Thông số kỹ thuật */}
            <details className="bg-gray-50 rounded-lg shadow p-4">
              <summary className="cursor-pointer text-lg font-semibold">
                Cấu hình &amp; Bộ nhớ
              </summary>
              <div className="mt-2">
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Hệ điều hành:</span>
                  <span className="text-gray-800">iOS 18</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Chip xử lý (CPU):</span>
                  <span className="text-gray-800">Apple A18 Pro 6 nhân</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Tốc độ CPU:</span>
                  <span className="text-gray-800">Hãng không công bố</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Chip đồ họa (GPU):</span>
                  <span className="text-gray-800">Apple GPU 6 nhân</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">RAM:</span>
                  <span className="text-gray-800">8 GB</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">Dung lượng lưu trữ:</span>
                  <span className="text-gray-800">256 GB</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="text-gray-600">
                    Dung lượng còn lại (khả dụng):
                  </span>
                  <span className="text-gray-800">241 GB</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Danh bạ:</span>
                  <span className="text-gray-800">Không giới hạn</span>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
