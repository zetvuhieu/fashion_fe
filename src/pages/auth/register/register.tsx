import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      console.log(response.data);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");

      // Optionally, show a success message or redirect
      alert("Đăng ký thành công!");
      // Handle successful registration (e.g., show a success message or redirect)
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Số điện thoại hoặc email đã tồn tại");
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-100 py-16 px-4">
      <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">ĐĂNG KÝ</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Họ
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Họ"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Tên
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Tên"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
