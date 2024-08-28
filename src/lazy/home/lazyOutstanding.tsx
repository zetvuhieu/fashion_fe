import React, { Suspense, lazy } from "react";
import { ClipLoader } from "react-spinners";

const OutStanding = lazy(() => import("@/pages/home/components/outstanding"));

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100px",
};

export const LazyOutStanding: React.FC = () => (
  <Suspense
    fallback={
      <div style={centerStyle}>
        <ClipLoader size={35} color={"#DEF3EE"} loading={true} />
      </div>
    }
  >
    <OutStanding />
  </Suspense>
);
