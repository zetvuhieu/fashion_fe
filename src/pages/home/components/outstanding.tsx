import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  selectProductsData,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/features/fetchProducts";
import "./styles/outstanding.css";

const API_URL = import.meta.env.VITE_API_URL;

const OutStanding: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProductsData);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  // Giả lập sản phẩm nổi bật
  const recentProducts = useMemo(() => products?.slice(-10), [products]);

  if (error) {
    return <div>Error loading slides: {error.message}</div>;
  }

  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
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
          arrows: true,
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

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      <div className="w-full flex justify-center mt-4 lg:mt-20 ">
        <div className="container flex justify-center">
          <h1 className="font-bold text-xl tracking-wide font-serif text-green-700 lg:text-4xl">
            Sản phẩm nổi bật
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4 lg:mt-12">
        <div className="container w-[90%]">
          <Slider {...settings}>
            {recentProducts &&
              recentProducts.map((item) => (
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

export default OutStanding;
