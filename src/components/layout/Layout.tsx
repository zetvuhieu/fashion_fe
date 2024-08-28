import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import { LazyFooter } from "@/lazy/footer/lazyFooter";
import BackToTop from "@/components/layout/BacktoTop";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <BackToTop />
      <LazyFooter />
    </>
  );
};

export default Layout;
