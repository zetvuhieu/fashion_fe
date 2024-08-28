import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        {/* <ScrollButton /> */}
      </Suspense>
    </>
  );
}
