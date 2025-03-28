//// filepath: c:\Users\Lenovo\OneDrive\Desktop\Nosql_pj\frontend\src\pages\ProductDetail\ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import defaultProductImage from "../../assets/default_product.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy tham số ID trên URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]); // State để lưu sản phẩm liên quan

  // Side effect

  // Cuộn về đầu trang khi ID sản phẩm thay đổi
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [id]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/related/${id}`);
        setRelatedProducts(response.data.data);
        const limitedProducts = response.data.data.slice(0, 4); // Lấy tối đa 6 sản phẩm
        setRelatedProducts(limitedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value); // Cập nhật state với giá trị mới
    } else {
      setQuantity(1); // Đặt giá trị tối thiểu là 1 nếu nhập số không hợp lệ
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity }));
  };

  // Hiển thị "Đang tải..." khi chưa có dữ liệu
  if (!product) {
    return <div className="p-4">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="max-w-4xl min-h-screen p-4 mx-auto bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Hình ảnh sản phẩm */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
          <img
            src={product.image ? `http://localhost:3000/images/${product.image}` : defaultProductImage}
            alt={product.name || "Chưa cập nhật"}
            className="object-cover w-64 h-64 rounded-lg shadow-md"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl font-bold text-black uppercase md:text-3xl">
            {product.name}
          </h1>
          <p className="mb-4 text-xl font-bold text-red-500 md:text-2xl">
            {product.price && !isNaN(Number(product.price))
              ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(Number(product.price))
              : "Giá không khả dụng"}
          </p>

          <p className="mb-6 text-sm text-black">
            {product.shortDescription || "Chưa cập nhật"}
          </p>

          {/* <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-black">
              Thông số kỹ thuật
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-black">
              <div>
                <p>
                  <strong>Danh mục:</strong> {product.category || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Chip:</strong> {product.chip || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Màu sắc:</strong> {product.color || "Chưa cập nhật"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Kích thước màn hình:</strong>{" "}
                  {product.screenSize || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>RAM:</strong> {product.ram || "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div> */}

          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center border border-gray-300 rounded">
              <input
                type="number"
                value={quantity} // Giá trị được liên kết với state
                onChange={handleQuantityChange} // Cập nhật state khi người dùng nhập
                min={1}
                className="w-20 p-2 text-center rounded-l outline-none"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 font-semibold text-white transition bg-blue-500 rounded-md shadow hover:bg-blue-600"
            >
              THÊM VÀO GIỎ
            </button>
          </div>

          {/* Trời ơi! Cứu, tại sao lại code tới bước đường cùng như này, Phát thích thì anh chiều */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-black">Mô tả chi tiết</h2>
            {product.description ? (
              <div className="grid grid-cols-2 gap-4 text-sm text-black">
                {(() => {
                  const lines = product.description.split("\r\n");
                  const pairs = [];
                  // Duyệt mảng dòng theo cặp (thuộc tính, giá trị)
                  for (let i = 0; i < lines.length; i += 2) {
                    const attributeLine = lines[i]; // Dòng thuộc tính
                    const valueLine = lines[i + 1]; // Dòng giá trị
                    // Kiểm tra dòng thuộc tính có chứa ":" và dòng giá trị tồn tại
                    if (
                      attributeLine &&
                      attributeLine.includes(":") &&
                      valueLine &&
                      valueLine.trim()
                    ) {
                      const attribute = attributeLine.split(":")[0].trim(); // Lấy phần trước dấu ":"
                      const value = valueLine.trim();
                      pairs.push(
                        <div key={i}>
                          <strong className="mr-1">{attribute}:</strong>
                          <span>{value}</span>
                        </div>
                      );
                    }
                  }
                  return pairs.length > 0 ? (
                    pairs
                  ) : (
                    <p className="col-span-2 text-sm text-black">
                      Không có thông tin chi tiết.
                    </p>
                  );
                })()}
              </div>
            ) : (
              <p className="text-sm text-black">
                Thiết kế sang trọng, khung titan bền bỉ, mặt lưng kính cường lực...
              </p>
            )}
          </div>


        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-black">Sản phẩm liên quan</h2>
        <div className="flex space-x-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              {/* Ảnh sản phẩm */}
              <img
                src={
                  relatedProduct.image
                    ? `http://localhost:3000/images/${relatedProduct.image}`
                    : defaultProductImage
                }
                alt={relatedProduct.name || "Chưa cập nhật"}
                className="object-cover w-full h-32 mb-2 rounded cursor-pointer"
                onClick={() => {
                  navigate(`/product/${relatedProduct._id}`); // Điều hướng đến sản phẩm liên quan
                }}
              />
              {/* Tên sản phẩm */}
              <h3
                className="text-lg font-semibold text-black cursor-pointer"
                onClick={() => {
                  navigate(`/product/${relatedProduct._id}`); // Điều hướng đến sản phẩm liên quan
                }}
              >
                {relatedProduct.name}
              </h3>
              {/* Giá sản phẩm */}
              <p className="text-red-500">
                {relatedProduct.price && !isNaN(Number(relatedProduct.price))
                  ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(relatedProduct.price))
                  : "Giá không khả dụng"}
              </p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ProductDetail;