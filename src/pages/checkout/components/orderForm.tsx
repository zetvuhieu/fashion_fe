import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { FcPrevious } from "react-icons/fc";
import { clearCart } from "@/redux/features/cart/cartSlice";
import {
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import axios from "axios";
import { refreshAccessToken } from "@/services/tokenService";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

interface OrderProp {
  setOrderProp: (success: boolean) => void;
}

const OrderForm: React.FC<OrderProp> = ({ setOrderProp }) => {
  const dispatch = useDispatch();
  const [loadingProgress, setLoadingProgress] = useState<boolean>(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [token, setToken] = useState<string | null>(null);

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const API_URL = import.meta.env.VITE_API_URL;

  // Hàm xử lý thay đổi dữ liệu nhập vào
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipient({
      ...recipient,
      [name]: value,
    });
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Sử dụng token đã làm mới để gửi yêu cầu đặt hàng
    if (!token) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setIsLoading(false);
      return;
    }

    try {
      const orderData = {
        recipient,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
          name: item.name,
        })),
        totalPrice,
      };

      await axios.post(`${API_URL}/api/checkout`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(clearCart());

      setOrderSuccess(true);
    } catch (error: any) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      alert("Đặt hàng thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      setOrderProp(false);
      window.scrollTo(0, 0);
    }
  };

  // useEffect để làm mới token khi component được mount
  useEffect(() => {
    const fetchToken = async () => {
      const newToken = await refreshAccessToken();
      setToken(newToken);
      setLoadingProgress(false);
    };

    fetchToken();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        {orderSuccess ? (
          <div className="bg-[#ffffff] border border-[#28bd39] rounded-md flex flex-col justify-center items-center p-16">
            <Confetti />
            <LoadingBar
              progress={loadingProgress ? 10 : 100}
              height={3}
              color="#0000EE"
              onLoaderFinished={() => {}}
            />
            <div className="flex justify-center p-2">
              <FaCheckCircle className="text-8xl text-[#28bd39]" />
            </div>
            <div className="flex flex-col justify-center items-center pt-8">
              <h3 className="font-semibold text-[#28bd39] text-2xl">
                Đặt hàng thành công
              </h3>
              <p className="font-semibold text-xl pt-1">Cám ơn quý khách</p>
            </div>
          </div>
        ) : (
          <div className=" mt-4">
            <h1 className="text-2xl font-bold text-center">
              Thông tin nhận hàng
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={recipient.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={recipient.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={recipient.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-[#46694f] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#344f3b]  ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Đang xử lý...
                  </div>
                ) : (
                  "Đặt hàng"
                )}
              </button>
              <Link to="/cart">
                <button
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                  className="w-full pt-4 font-medium flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-600"
                >
                  <FcPrevious />
                  Quay về giỏ hàng
                </button>
              </Link>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderForm;
