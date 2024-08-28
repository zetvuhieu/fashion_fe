import React from "react";
import emailjs from "emailjs-com";

const Intro: React.FC = () => {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lấy tham chiếu đến form
    const form = e.target as HTMLFormElement;

    emailjs
      .sendForm(
        "service_hgly0f3", // Service ID của bạn
        "template_1hkdupm", // Template ID của bạn
        form, // Tham chiếu form để lấy dữ liệu
        "rH1Qg3_NR2BbPfeEb" // Public Key của bạn
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          form.reset(); // Reset form sau khi gửi thành công
        },
        (error) => {
          console.error("Error:", error.text);
        }
      );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center py-8">
        <div className="w-[90%] lg:container bg-white p-6 lg:py-20 shadow-lg rounded-lg lg:shadow-none lg:rounded-none">
          <div className="flex-col mb-6">
            <h2 className="font-bold text-2xl mb-2">Bạn cần tư vấn?</h2>
            <p className="text-gray-700">
              Liên hệ ngay với chúng tôi để được giải đáp mọi thắc mắc. Chúng
              tôi sẽ phản hồi ngay khi nhận được thông tin của quý khách.
            </p>
          </div>
          <form onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-cyan-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-cyan-400"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Điện thoại"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-cyan-400"
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung"
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-cyan-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Gửi thông tin
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Intro;
