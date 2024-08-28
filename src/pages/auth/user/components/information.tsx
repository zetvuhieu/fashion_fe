import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import LoadingBar from "react-top-loading-bar";

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
    window.location.reload();
  };
  const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "500px",
  };

  if (!user)
    return (
      <div style={centerStyle}>
        <ClipLoader size={50} color={"#000"} loading={true} />
      </div>
    );

  return (
    <>
      <LoadingBar
        progress={!user ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="w-full flex justify-center items-center bg-gray-100 py-16 px-4">
        <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Thông Tin Người Dùng
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="text-gray-700 text-sm font-bold">Họ:</label>
            <p className="text-gray-900">{user.firstName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="text-gray-700 text-sm font-bold">Tên:</label>
            <p className="text-gray-900">{user.lastName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="text-gray-700 text-sm font-bold">Email:</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="text-gray-700 text-sm font-bold">
              Số điện thoại:
            </label>
            <p className="text-gray-900">{user.phoneNumber}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
