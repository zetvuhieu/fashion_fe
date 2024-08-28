import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "@/pages/home/Home";
import Introduce from "@/pages/introduce/Introduce";
import Products from "@/pages/products/products";
import Contact from "@/pages/contact/contact";
import Category from "@/pages/category/category";
import ProductDetail from "@/pages/productDetail/productDetail";
import Auth from "@/pages/auth/login/login";
import Register from "@/pages/auth/register/register";
import Cart from "@/pages/cart/cart";
import User from "@/pages/auth/user/user";
import Checkout from "@/pages/checkout/checkout";
import SearchByName from "@/pages/search/searchByName";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="introduce" element={<Introduce />} />
      <Route path="products" element={<Products />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Auth />} />
      <Route path="register" element={<Register />} />
      <Route path="user" element={<User />} />
      <Route path="cart" element={<Cart />} />
      <Route path="category/:categorySlug" element={<Category />} />
      {/* Đường dẫn cho chi tiết sản phẩm */}
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="checkout" element={<Checkout />} />{" "}
      <Route path="search-by-name" element={<SearchByName />} />
    </Route>
  )
);
