import React, { useEffect, useState } from "react";
import datajson from "./data/content.json";
import LoadingBar from "react-top-loading-bar";
import ClipLoader from "react-spinners/ClipLoader";

interface DataItem {
  title: String;
  paragraph: String;
  intro?: string;
  sub?: string;
}

const Content: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataItem[]>([]);
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
    <>
      <LoadingBar
        progress={loading ? 10 : 100}
        height={3}
        color="#0000EE"
        onLoaderFinished={() => {}}
      />
      <div className="w-full flex justify-center mt-2 lg:py-8">
        <div className="container flex justify-center">
          <div className="w-[90%]">
            {data.map((item, index) => (
              <div className=" flex flex-col justify-center py-2" key={index}>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <div className="content-block lg:text-xl">
                  <p className="py-1">{item.intro}</p>
                  <p className="py-1">{item.paragraph}</p>
                  <p className="py-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;
