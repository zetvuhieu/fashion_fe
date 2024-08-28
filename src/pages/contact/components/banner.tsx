import React from "react";
import BannerImg from "@/assets/img/contact/contact.png";

const Banner: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center py-8">
        <div className="w-[90%] lg:container shadow-lg rounded-lg flex justify-center lg:rounded-none lg:shadow-none lg:py-2">
          <img className="object-cover" src={BannerImg} />
        </div>
      </div>
    </>
  );
};
export default Banner;
