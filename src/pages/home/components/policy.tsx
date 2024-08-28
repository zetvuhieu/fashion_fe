import React, { useEffect, useState } from "react";
import datajson from "./data/policy.json";
import ClipLoader from "react-spinners/ClipLoader";
import Icons1 from "@/assets/img/policy/why_1.jpg";
import Icons2 from "@/assets/img/policy/why_2.jpg";
import Icons3 from "@/assets/img/policy/why_3.jpg";
import Icons4 from "@/assets/img/policy/why_4.jpg";

interface DataItem {
  title: string;
  paragraph: string;
}

const PolicyComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataItem[]>([]);
  const icons: string[] = [Icons1, Icons2, Icons3, Icons4];
  const arrayBackgroundColor: string[] = [
    "#6b8772",
    "#46694f",
    "#38543f",
    "#2a3f2f",
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(datajson);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#0000EE" size={50} />
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#b5c3b9] py-4 lg:py-16 shadow-2xl">
      <ul className="flex flex-col w-[90%] lg:flex-row">
        {data.map((item, index) => (
          <li
            key={index}
            style={{ backgroundColor: arrayBackgroundColor[index] }}
            className="flex justify-center border-b border-b-white py-2 lg:border-r lg:border-r-white lg:flex-col lg:py-8"
          >
            <div className="w-[30%] flex justify-center items-center lg:w-full">
              <img
                src={icons[index]}
                alt={item.title}
                className="object-cover h-[70%] w-auto lg:h-full"
              />
            </div>

            <div className="w-[70%]  flex flex-col lg:py-8 lg:w-full lg:px-4">
              <h3 className="text-white text-sm font-semibold lg:text-center lg:text-xl">
                {item.title}
              </h3>
              <p className="text-white texy-sm font-light lg:text-center lg:text-lg lg:font-momo">
                {item.paragraph}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyComponent;
