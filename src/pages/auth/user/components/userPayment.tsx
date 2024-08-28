import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { refreshAccessToken } from "@/services/tokenService";
import { formatPrice } from "@/utils/format";

const UserInfo: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTokenAndOrders = async () => {
      try {
        // Always refresh token on component mount
        const newToken = await refreshAccessToken();
        setToken(newToken);

        // Fetch the orders after the token is refreshed
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        // Handle token expiration or other errors here if necessary
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchTokenAndOrders();
  }, [API_URL]);

  const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "500px",
  };

  return (
    <>
      <div className="w-full flex justify-center items-center bg-gray-100 py-8 px-2 sm:py-16 sm:px-4">
        <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Đơn Hàng Đã Đặt
          </h3>

          {loadingOrders ? (
            <div style={centerStyle}>
              <ClipLoader size={50} color={"#000"} loading={true} />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-700">Chưa có đơn hàng nào.</p>
          ) : (
            <>
              {/* Mobile Layout */}
              <div className="space-y-4 lg:hidden">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 bg-gray-50 rounded-md shadow sm:flex sm:justify-between"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm sm:text-base">
                        <span className="font-semibold">Mã đơn hàng:</span>{" "}
                        {order._id}
                      </p>
                      <p className="text-sm sm:text-base">
                        <span className="font-semibold">Ngày đặt hàng:</span>{" "}
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                      <p className="text-sm sm:text-base">
                        <span className="font-semibold">Tổng tiền:</span>{" "}
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                    <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-2">
                      {order.items.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="p-2 bg-white rounded-md shadow"
                        >
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Tên sản phẩm:</span>{" "}
                            {item.name}
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Mã sản phẩm:</span>{" "}
                            {item._id}
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Số lượng:</span>{" "}
                            {item.quantity}
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Size:</span>{" "}
                            {item.size || "Không có"}
                          </p>
                          <p className="text-sm sm:text-base">
                            <span className="font-semibold">Giá:</span>{" "}
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* LG and above: Table Layout */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border-b">Mã đơn hàng</th>
                      <th className="px-4 py-2 border-b">Ngày đặt hàng</th>
                      <th className="px-4 py-2 border-b">Tổng tiền (VND)</th>
                      <th className="px-4 py-2 border-b">Chi tiết sản phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="text-center">
                        <td className="px-4 py-2 border-b">{order._id}</td>
                        <td className="px-4 py-2 border-b">
                          {new Date(order.orderDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 border-b">
                          {formatPrice(order.totalPrice)}
                        </td>
                        <td className="px-4 py-2 border-b text-left">
                          <details>
                            <summary className="cursor-pointer text-blue-600">
                              Xem chi tiết
                            </summary>
                            <ul className="mt-2 space-y-2">
                              {order.items.map((item: any, index: number) => (
                                <li
                                  key={index}
                                  className="p-2 bg-gray-50 rounded-md shadow"
                                >
                                  <p>
                                    <span className="font-semibold">
                                      Tên sản phẩm:
                                    </span>{" "}
                                    {item.name}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Mã sản phẩm:
                                    </span>{" "}
                                    {item._id}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Số lượng:
                                    </span>{" "}
                                    {item.quantity}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Size:</span>{" "}
                                    {item.size || "Không có"}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Giá:</span>{" "}
                                    {formatPrice(item.price)}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
