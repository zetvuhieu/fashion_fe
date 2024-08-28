import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import LoadingBar from "react-top-loading-bar";

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

const OrderSummary: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState<boolean>(true);
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    setLoadingProgress(false);
  });

  return (
    <>
      <LoadingBar
        progress={loadingProgress ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="flex justify-center w-full">
        <div className="w-[90%]">
          <h2 className="m-4 text-xl font-bold text-center">
            Sản phẩm trong giỏ hàng
          </h2>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 whitespace-nowrap">Sản phẩm</th>
                <th className="pb-2 whitespace-nowrap text-center">Số lượng</th>
                <th className="pb-2 whitespace-nowrap text-center">Giá</th>
                <th className="pb-2 whitespace-nowrap text-center">Size</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 flex items-center">
                    <img
                      src={formatImageUrl(item.image)}
                      alt={item.name}
                      className="mr-4 w-12 h-12 object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-center">
                    {item.price.toLocaleString()} VND
                  </td>
                  <td className="py-2 text-center">{item.size || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-lg font-semibold mt-4">
            Tổng cộng: {totalPrice.toLocaleString()} VND
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
