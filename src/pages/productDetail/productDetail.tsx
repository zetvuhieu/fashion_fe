// src/components/ProductDetail.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { LazyRecommended } from "@/lazy/productsDetail/recommendedLazy";
import { addItem } from "@/redux/features/cart/cartSlice";
import { ClipLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";

const API_URL = import.meta.env.VITE_API_URL;

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const categoryMapping: { [key: string]: string } = {
  "666ff76872f5a80b28747ecb": "Áo thể thao",
  "666ff77b72f5a80b28747ece": "Quần thể thao",
  "666ff78072f5a80b28747ed1": "Giày thể thao",
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Sử dụng useFetch để gọi API và lấy dữ liệu sản phẩm
  const {
    data: product,
    loading,
    error,
  } = useFetch<Product>(`${API_URL}/api/products/${id}`);

  // Tạo size giày
  const sizesShoes: number[] = [];
  for (let i = 37; i <= 44; i++) {
    sizesShoes.push(i);
  }

  // Tạo size áo
  const sizesShirt: string[] = ["S", "M", "L", "XL"];

  // Khởi tạo size mặc định khi dữ liệu sản phẩm đã có
  useEffect(() => {
    if (product) {
      const category = categoryMapping[product.category];
      if (category === "Giày thể thao") {
        setSelectedSize(sizesShoes[0]);
      } else if (category === "Áo thể thao" || category === "Quần thể thao") {
        setSelectedSize(sizesShirt[0]);
      } else {
        setSelectedSize(null);
      }
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(product);
    const token = localStorage.getItem("accessToken");
    // Nếu token không tồn tại, người dùng chưa đăng nhập
    setIsLoggedIn(!!token);
  }, [id]);

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        image: product.image,
      };
      dispatch(addItem(cartItem));

      // Reset state
      setSelectedSize(
        categoryMapping[product.category] === "Giày thể thao"
          ? sizesShoes[0]
          : categoryMapping[product.category] === "Áo thể thao" ||
            categoryMapping[product.category] === "Quần thể thao"
          ? sizesShirt[0]
          : null
      );
      setQuantity(1);
      console.log(cartItem);
    }
  };
  const handleClick = () => {
    navigate(isLoggedIn ? "/checkout" : "/login");
  };

  const handleCheckout = () => {
    handleAddToCart();
    handleClick();
  };

  const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
  };

  if (loading)
    return (
      <>
        <div>
          <LoadingBar
            progress={loading ? 10 : 100}
            height={3}
            color="#0000EE"
            onLoaderFinished={() => {}}
          />
          <div style={centerStyle}>
            <ClipLoader size={35} color={"#000"} loading={true} />
          </div>
        </div>
      </>
    );
  if (error) return <div>{error}</div>;

  const renderSizes = () => {
    if (product && product.category) {
      const category = categoryMapping[product.category];

      if (category === "Giày thể thao") {
        return sizesShoes.map((size) => (
          <div
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`border border-gray-300 p-4 rounded-md cursor-pointer hover:bg-gray-200 ${
              selectedSize === size ? "bg-gray-300" : ""
            }`}
          >
            {size}
          </div>
        ));
      } else if (category === "Áo thể thao" || category === "Quần thể thao") {
        return sizesShirt.map((size) => (
          <div
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`border border-gray-300 p-4 rounded-md cursor-pointer hover:bg-gray-200 ${
              selectedSize === size ? "bg-gray-300" : ""
            }`}
          >
            {size}
          </div>
        ));
      }
    }
    return null;
  };

  return (
    <>
      <div>
        <div className="container mx-auto p-4">
          {product && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden lg:flex justify-center">
              <div className="lg:w-[50%]">
                <img
                  src={formatImageUrl(product.image)}
                  alt={product.name}
                  className="object-cover w-full"
                  style={{ maxHeight: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="p-4 lg:w-[50%]">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                  <p className="text-red-600 font-semibold text-2xl mb-2">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-gray-800 mb-4 text-xl">
                    {product.description}
                  </p>
                </div>
                {selectedSize && (
                  <p className="mt-4 text-lg font-semibold">
                    Size đã chọn: {selectedSize}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">{renderSizes()}</div>
                <p className="mt-4 text-lg font-semibold">
                  Số lượng: {quantity}
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={() => {
                      handleAddToCart();
                      window.location.reload();
                    }}
                    className="text-amber-800 mt-4 mr-4 py-2 px-4 rounded border border-slate-400 hover:bg-black hover:text-white"
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    className="bg-green-800 text-white mt-4 py-2 px-4 rounded hover:bg-black"
                    onClick={handleCheckout}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <LazyRecommended />
      </div>
    </>
  );
};

export default ProductDetail;
