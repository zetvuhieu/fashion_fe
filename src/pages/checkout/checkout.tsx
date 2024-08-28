import React, { useState } from "react";
import OrderSummary from "./components/orderSummary";
import OrderForm from "./components/orderForm";

const Checkout: React.FC = () => {
  const [orderProp, setOrderProp] = useState<boolean>(true);

  return (
    <>
      <div className="lg-flex lg-justify-around">
        {orderProp && <OrderSummary />}
        <OrderForm setOrderProp={setOrderProp} />
      </div>
    </>
  );
};

export default Checkout;
