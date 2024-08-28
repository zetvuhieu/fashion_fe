import React, { useState } from "react";
import Information from "./components/information";
import UserPayment from "./components/userPayment";

const UserComponent: React.FC = () => {
  const [tab, setTab] = useState<string>("information");

  const handleChangeTab = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <>
      <div className="flex justify-center mb-4 py-12">
        <button
          className={`px-4 py-2 ${
            tab === "information" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleChangeTab("information")}
        >
          Thông tin khách hàng
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "userpayment" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded ml-2`}
          onClick={() => handleChangeTab("userpayment")}
        >
          Đơn hàng của bạn
        </button>
      </div>
      <div>
        {tab === "information" && <Information />}
        {tab === "userpayment" && <UserPayment />}
      </div>
    </>
  );
};

export default UserComponent;
