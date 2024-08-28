import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const Footer = lazy(() => import("@/components/layout/Footer"));

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100px",
};

export const LazyFooter: React.FC = () => (
  <Suspense
    fallback={
      <div style={centerStyle}>
        <ClipLoader size={35} color={"#DEF3EE"} loading={true} />
      </div>
    }
  >
    <Footer />
  </Suspense>
);
