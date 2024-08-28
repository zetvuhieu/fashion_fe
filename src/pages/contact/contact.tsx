import React from "react";
import Form from "./components/form";
import Banner from "./components/banner";

const Contact: React.FC = () => {
  return (
    <>
      <div className="lg:flex lg:justify-center lg:w-full">
        <div className="lg:w-[90%] lg:flex justify-between">
          <Form />
          <Banner />
        </div>
      </div>
    </>
  );
};

export default Contact;
