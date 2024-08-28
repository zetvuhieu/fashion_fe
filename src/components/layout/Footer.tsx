import React, { useEffect, useState } from "react";
import Logo from "@/assets/img/logo/logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BiPhoneCall,
  BiMessageDetail,
  BiLogoFacebookSquare,
  BiSolidCopyright,
} from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

const Footer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  interface InfoItem {
    icon: JSX.Element;
    text: String;
  }
  const arrayInfo: InfoItem[] = [
    {
      icon: <IoLocationOutline />,
      text: "Tầng 6, Tòa Ladeco, 266 Đội Cấn, Quận Ba Đình, TP Hà Nội",
    },
    {
      icon: <BiPhoneCall />,
      text: "1800.6750",
    },
    {
      icon: <BiMessageDetail />,
      text: "support@sapo.vn",
    },
    {
      icon: <BiLogoFacebookSquare />,
      text: "oh_thethao_fashion",
    },
  ];

  interface ListMenu {
    [key: string]: string[];
  }

  const arrayMenuItems: ListMenu[] = [
    {
      "Về chúng tôi": [
        "Trang chủ",
        "Giới thiệu",
        "Sản phẩm",
        "Hệ thống cửa hàng",
      ],
      "Chính sách": [
        "Chính sách đối tác",
        "Chính sách đổi trả",
        "Chính sách thanh toán",
        "Chính sách giao hàng",
      ],
      "Tư vấn khách hàng": [
        "Mua hàng 1800.6750",
        "Bảo hành 1800.6750",
        "Khiếu nại 1800.6750",
      ],
    },
  ];
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#0000EE" size={50} />
      </div>
    );
  }
  return (
    <>
      <footer className="w-full bg-[#222222] flex justify-center">
        <div className="container py-4 flex flex-col items-center">
          <div className="bg-[#46694f] flex flex-col justify-around items-center py-4 w-[90%] rounded-lg lg:flex-row lg:space-x-4 lg:items-center lg:w-full lg:py-8">
            <h2 className="text-white text-md md:text-xl font-semibold mb-4 lg:mb-0 lg:text-2xl">
              Nhận thông tin khuyến mãi từ chúng tôi
            </h2>
            <div className="relative w-[90%] lg:w-[50%]">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none lg:py-4"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#46694f] text-white rounded-md hover:bg-green-600">
                Gửi
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-around items-center py-4 lg:flex-wrap">
            <div className="w-[90%] lg:w-[50%]">
              <img className="object-cover  w-1/3 lg:w-1/4" src={Logo} />
              <h3 className="text-white text-md md:text-xl font-semibold mt-4 lg:mb-0 lg:text-2xl">
                CỬA HÀNG PHÂN PHỐI ĐỒ THỂ THAO CHÍNH HÃNG
              </h3>
              <div className="w-full flex flex-col py-4 space-y-4 lg:space-y-0">
                <ul className="">
                  {arrayInfo.map((item, index) => (
                    <li
                      key={index}
                      className="text-white flex items-center space-x-4 p-2"
                    >
                      <span className="text-xl font-serif lg:text-2xl">
                        {item.icon}
                      </span>
                      <span className="cursor-pointer lg:text-lg">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-[90%] lg:w-[50%]">
              <div>
                {arrayMenuItems.map((item, index) => (
                  <ul className="lg:flex lg:justify-center" key={index}>
                    {Object.keys(item).map((menuTitle) => (
                      <ul key={menuTitle} className="text-white py-4 lg:px-4">
                        <h3 className="text-xl font-bold">{menuTitle}</h3>
                        <ul className="ml-4 py-1 lg:ml-0">
                          {item[menuTitle].map((menuItem, itemIndex) => (
                            <li key={itemIndex}>
                              <span className="cursor-pointer hover:text-[#80b885]">
                                {menuItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </ul>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className="w-[90%] lg:hidden">
              <div className="border-t border-gray-100 w-full my-4"></div>
            </div>
            <div className="w-[90%] flex flex-col items-center text-white">
              <div className="flex items-center space-x-2">
                <BiSolidCopyright />
                <h2>Bản quyền thuộc về OH!Team.</h2>
              </div>
              <h3>Cung cấp bởi Sapo</h3>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
