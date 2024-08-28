import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearCart } from "@/redux/features/cart/cartSlice";
import {
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const [loadingProgress, setLoadingProgress] = useState<boolean>(true);

  const handleRemoveItem = (id: string, size?: string | number) => {
    dispatch(removeItem({ id, size }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const formatImageUrl = (imagePath: string): string => {
    // Tìm vị trí cuối cùng của dấu gạch chéo ngược trong đường dẫn
    const lastBackslashIndex = imagePath.lastIndexOf("\\");

    // Cắt chuỗi từ vị trí dấu gạch chéo ngược kế cuối để lấy tên tệp
    const fileName = imagePath.substring(lastBackslashIndex + 1);

    // Tạo URL từ tên tệp
    const formattedUrl = `${API_URL}/uploads/${fileName}`;

    return formattedUrl;
  };

  useEffect(() => {
    const updateLocalStorage = async () => {
      try {
        setLoadingProgress(true); // Start loading
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      } finally {
        setLoadingProgress(false); // End loading
      }
    };

    updateLocalStorage();
  }, [cartItems]);

  return (
    <>
      <LoadingBar
        progress={loadingProgress ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn hiện đang trống.</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className="border-b border-gray-300 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={formatImageUrl(item.image)}
                      alt={item.image}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.size)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <p className="text-xl font-bold">
                Tổng tiền: {formatPrice(totalPrice)}
              </p>
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Xóa tất cả
              </button>
              <Link to="/checkout">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4">
                  Thanh toán
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
