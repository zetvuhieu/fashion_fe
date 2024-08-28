// src/components/dealHot.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProductsData,
  selectProductsLoading,
  selectProductsError,
} from "@/redux/features/fetchProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const DealHot: React.FC = () => {
  const dispatch = useDispatch();
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const dealProducts = useMemo(() => products?.slice(5, 10), [products]);

  const settings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="w-full bg-[#46694f] py-4">
        <div className="flex flex-col items-center justify-center">
          <div>
            <h1 className="text-2xl text-white font-bold">
              DEAL HOT TRONG TUẦN
            </h1>
          </div>
          <div className="w-full flex justify-center mt-4 lg:mt-12">
            <div className="container w-[90%]">
              <Slider {...settings}>
                {dealProducts &&
                  dealProducts.map((item) => (
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
                        />
                        <div className="p-4">
                          <h2 className="text-xl font-semibold line-clamp-2 h-[4rem] lg:h-[4.5rem]">
                            {item.name}
                          </h2>
                          <p className="text-xl text-[#EB6969] font-semibold">
                            {formatPrice(item.price)}
                          </p>
                          <p className="text-lg text-gray-600 mt-2 font-semibold">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealHot;
