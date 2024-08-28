import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

const API_URL = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Xóa token cũ nếu có
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");

      // Lưu token mới
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(user));

      // Reset form và chuyển hướng đến trang người dùng
      setEmail("");
      setPassword("");
      navigate("/user");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <>
      <LoadingBar
        progress={loading ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="w-full flex justify-center items-center bg-gray-100 py-16 px-4">
        <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">ĐĂNG NHẬP</h3>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-500">
                <p>{error}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Đăng nhập
              </button>
              <div className="mt-4 w-full flex justify-between">
                <button>Quên mật khẩu</button>
                <Link to="/register">
                  <button className="text-red-600">Đăng ký</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
