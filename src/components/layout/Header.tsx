import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoIosArrowDown } from "react-icons/io";
import { IoCall, IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaUser, FaRegHeart } from "react-icons/fa";
import Logo from "@/assets/img/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsCount } from "@/redux/features/cart/cartSlice";
import { RootState, AppDispatch } from "@/redux/store";
import {
  setSearchTerm,
  fetchProductsByName,
} from "@/redux/features/products/searchSlice";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const h3Ref = useRef<(HTMLHeadingElement | null)[]>([]);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  // Hàm xử lý thay đổi input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };
  // Hàm xử lý submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm) {
      dispatch(fetchProductsByName(searchTerm));
      navigate("/search-by-name");
      dispatch(setSearchTerm(""));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // Nếu token không tồn tại, người dùng chưa đăng nhập
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/user");
    } else {
      navigate("/login"); // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
    }
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  interface MenuProduct {
    category: string;
    items: string[];
  }

  const arrayMenuProducts: MenuProduct[] = [
    {
      category: "Áo thể thao",
      items: ["Áo giữ nhiệt", "Áo ba lỗ", "Áo thun thể thao"],
    },
    {
      category: "Quần thể thao",
      items: [
        "Quần dài thể thao",
        "Quần legging thể thao",
        "Quần jogger thể thao",
        "Quần short thể thao",
      ],
    },
    {
      category: "Giày thể thao",
      items: ["Nike", "Adiddas"],
    },
    {
      category: "Phụ kiện thể thao",
      items: ["Túi xách thể thao", "Bình nước thể thao"],
    },
  ];
  const handleLiHover = (index: number) => {
    if (h3Ref.current[index]) {
      h3Ref.current[index].classList.add("text-green-600");
    }
  };
  const handleLiLeave = (index: number) => {
    if (h3Ref.current[index]) {
      h3Ref.current[index].classList.remove("text-green-600");
    }
  };

  return (
    <>
      <header className="w-full bg-green-800 flex justify-center">
        <div className="container flex justify-between items-center py-4 px-4 lg:py-0 lg:px-0 md:py-2 md:px-2">
          <div className="w-1/4 cursor-pointer flex justify-center ">
            <div className="w-3/4 md:w-3/4 lg:w-3/4 flex justify-center lg:bg-green-900">
              <Link className="w-full flex justify-center" to="/">
                <img
                  className="object-cover md:w-2/3 lg:w-4/5"
                  src={Logo}
                  alt="Logo"
                />{" "}
              </Link>
            </div>
          </div>
          <div className="w-7/12">
            <div className="relative w-full">
              <div className="flex items-center w-full rounded-xl bg-white pl-4 pr-3 py-1">
                <input
                  className="flex-grow w-full outline-none md:py-1 lg:py-2"
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Tìm kiếm sản phẩm"
                />
                <div
                  className="ml-auto md:text-xl lg:text-2xl"
                  onClick={handleSubmit}
                >
                  <CiSearch className="text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>

            <nav className="w-full hidden md:block lg:block">
              <ul className="w-[80%] flex justify-between list-none p-0 m-0 space-x-4 mt-4">
                <li className="cursor-pointer text-white font-medium hover:text-green-500">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="cursor-pointer text-white font-medium hover:text-green-500">
                  <Link to="/introduce">Giới thiệu</Link>
                </li>
                <li className="relative group cursor-pointer text-white font-medium hover:text-green-500 ">
                  <span className="flex items-center">
                    <Link to="/products">Sản phẩm</Link>
                    <IoIosArrowDown className="ml-1 mt-1 font-medium" />
                  </span>
                  <div className="hidden absolute right-1/2 transform translate-x-1/2 bg-white rounded-lg shadow-lg group-hover:flex lg:mr-6 z-10">
                    <ul className="flex justify-between md:p-0 lg:p-4">
                      {arrayMenuProducts.map((menu, index) => (
                        <li className="relative" key={index}>
                          <h3
                            ref={(el) => (h3Ref.current[index] = el)}
                            className="hover:text-green-600 md:px-2 lg:px-8 py-2 truncate text-black font-bold"
                          >
                            <Link
                              to={`/category/${menu.category.replaceAll(
                                " ",
                                "-"
                              )}`}
                            >
                              {menu.category}
                            </Link>
                          </h3>
                          <ul>
                            {menu.items.map((item, idx) => (
                              <li
                                onMouseEnter={() => handleLiHover(index)}
                                onMouseLeave={() => handleLiLeave(index)}
                                className="hover:text-green-300 md:px-2 lg:px-8 py-2 truncate  text-black font-sans font-family:system-ui cursor-pointer"
                                key={idx}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="cursor-pointer text-white font-medium hover:text-green-500">
                  <Link to="/contact">Liên hệ</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-1/4 hidden md:flex lg:flex justify-around lg:items-center">
            <div className="relative">
              <Link to="/cart">
                <FaShoppingCart className="text-xl lg:text-2xl text-white cursor-pointer" />
                {cartItemsCount >= 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
            <FaUser
              className="text-xl lg:text-2xl text-white cursor-pointer"
              onClick={handleClick}
            />
            <FaRegHeart className="text-xl lg:text-2xl text-white cursor-pointer" />
            <a
              href="tel:+84123456789"
              className="text-xl lg:text-2xl text-white cursor-pointer"
            >
              <IoCall />
            </a>
          </div>

          <div className="md:hidden lg:hidden w-1/6 flex justify-end">
            <IoMdMenu className="cursor-pointer" onClick={toggleMenu} />
          </div>
          {/*Modal ẩn ở Mobile*/}
          <div
            className={`fixed inset-0 z-10
                      flex transform items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${
                        open ? "translate-x-0" : "translate-x-full"
                      }`}
          >
            <div className="relative w-full h-full bg-white p-4">
              <div className="absolute top-4 right-4">
                <IoClose
                  className="text-3xl cursor-pointer"
                  onClick={toggleMenu}
                />
              </div>
              <nav className="mt-8 flex flex-col items-center w-full">
                <ul className="cursor-pointer text-xl pb-2">
                  <li className="text-xl pb-2">
                    <Link to="/" onClick={toggleMenu}>
                      Trang chủ
                    </Link>
                  </li>
                  <li className="cursor-pointer text-xl pb-2">
                    <Link to="/introduce" onClick={toggleMenu}>
                      Giới thiệu
                    </Link>
                  </li>
                  <Link to="/products">
                    <li
                      className="cursor-pointer text-xl pb-2"
                      onClick={toggleMenu}
                    >
                      Sản phẩm
                    </li>
                  </Link>
                  <li className="cursor-pointer text-xl">
                    <Link to="/contact" onClick={toggleMenu}>
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="w-full flex justify-around mt-32">
                <div className="relative">
                  <Link to="/cart">
                    <FaShoppingCart
                      className="text-3xl cursor-pointer"
                      onClick={toggleMenu}
                    />
                    {cartItemsCount >= 0 && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </div>
                <FaUser
                  className="cursor-pointer text-3xl"
                  onClick={() => {
                    toggleMenu();
                    handleClick();
                  }}
                />
                <FaRegHeart
                  className="cursor-pointer text-3xl"
                  onClick={toggleMenu}
                />
                <a href="tel:+84123456789" className="cursor-pointer text-3xl">
                  <IoCall onClick={toggleMenu} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
