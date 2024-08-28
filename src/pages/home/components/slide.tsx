import React, { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "@/hooks/useFetch";
import LoadingBar from "react-top-loading-bar";

const API_URL = import.meta.env.VITE_API_URL;

interface Slide {
  title: string;
  image: string;
}

const slideShow: React.FC = () => {
  const {
    data: slides,
    loading,
    error,
  } = useFetch<Slide[]>(`${API_URL}/api/slides`);

  const memoizedSlides = useMemo(() => slides, [slides]);

  const formatImageUrl = (imagePath: string) => {
    const absolutePathIndex = imagePath.lastIndexOf("\\");
    const relativePath =
      absolutePathIndex !== -1
        ? imagePath.substring(absolutePathIndex + 1)
        : imagePath;
    return `${API_URL}/uploads/${relativePath}`;
  };

  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setLoadingProgress(10);
    } else {
      setLoadingProgress(100);
    }
  }, [loading]);

  if (error) {
    return <div>Error loading slides: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "black",
          opacity: "0.5",
          transition: "background-color 0.3s, opacity 0.3s",
        }}
      />
    ),
  };

  return (
    <div className="slideshow relative">
      <LoadingBar
        progress={loadingProgress}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      <Slider {...settings}>
        {memoizedSlides?.map((slide, index) => (
          <div key={index} className="slide">
            <img
              className="object-cover w-full h-full"
              src={formatImageUrl(slide.image)}
              alt={slide.title}
              style={{ maxHeight: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .slick-dots li button:before {
          font-size: 0;
        }
        .slick-dots li.slick-active div {
          background-color: white !important;
          opacity: 1 !important;
        }
        .slick-dots li div {
          background-color: black;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default slideShow;
