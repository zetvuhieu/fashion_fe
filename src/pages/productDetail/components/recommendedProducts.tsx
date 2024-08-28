import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingBar from "react-top-loading-bar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  selectProductsData,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/features/fetchProducts";

const recommendedProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsData);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const randomProducts = [...(products || [])] // Tạo bản sao của mảng products
    .sort(() => 0.5 - Math.random()) // Xáo trộn bản sao
    .slice(0, 10); // Lấy 10 sản phẩm đầu tiên từ bản sao đã xáo trộn

  const loadingProgress = useMemo(() => (loading ? 10 : 100), [loading]);

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);

    window.location.reload();
  };
  const settings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <LoadingBar
        progress={loadingProgress}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="w-full flex justify-center mt-4 lg:mt-20 ">
        <div className="container flex justify-center">
          <h1 className="font-bold text-xl tracking-wide font-serif text-green-700 lg:text-4xl">
            Sản phẩm liên quan
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4 lg:mt-12">
        <div className="container w-[90%]">
          <Slider {...settings}>
            {randomProducts &&
              randomProducts.map((item) => (
                <div
                  key={item._id}
                  className="item px-2 cursor-pointer"
                  onClick={() => handleProductClick(item._id)}
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      className="object-cover w-full"
                      src={formatImageUrl(item.image)}
                      alt={item.name}
                      style={{ maxHeight: "100%", objectFit: "cover" }}
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold line-clamp-2 lg:h-[4.5rem]">
                        {item.name}
                      </h2>
                      <p className="text-red-600 font-bold">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default recommendedProducts;
