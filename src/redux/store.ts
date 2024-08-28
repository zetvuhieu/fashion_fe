// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/redux/features/fetchProducts";
import categoriesReducer from "@/redux/features/products/category";
import productsFilterReducer from "@/redux/features/products/productsFilter";
import cartReducer from "@/redux/features/cart/cartSlice";
import searchReducer from "@/redux/features/products/searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    productsfilter: productsFilterReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
