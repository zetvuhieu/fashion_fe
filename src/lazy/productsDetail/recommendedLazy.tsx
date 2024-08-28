import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const Recommended = lazy(
  () => import("@/pages/productDetail/components/recommendedProducts")
);

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100px",
};

export const LazyRecommended: React.FC = () => (
  <Suspense
    fallback={
      <div style={centerStyle}>
        <ClipLoader size={35} color={"#DEF3EE"} loading={true} />
      </div>
    }
  >
    <Recommended />
  </Suspense>
);
