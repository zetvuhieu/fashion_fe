import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const DealHot = lazy(() => import("@/pages/home/components/dealhot"));

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100px",
};

export const LazyDealHot: React.FC = () => (
  <Suspense
    fallback={
      <div style={centerStyle}>
        <ClipLoader size={35} color={"#DEF3EE"} loading={true} />
      </div>
    }
  >
    <DealHot />
  </Suspense>
);
