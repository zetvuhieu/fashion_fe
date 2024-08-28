import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const Content = lazy(() => import("@/pages/introduce/components/content"));

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const LazyContent: React.FC = () => (
  <Suspense
    fallback={
      <div style={centerStyle}>
        <ClipLoader size={35} color={"#DEF3EE"} loading={true} />
      </div>
    }
  >
    <Content />
  </Suspense>
);
