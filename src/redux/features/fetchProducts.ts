import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Định nghĩa generic type cho việc fetch dữ liệu
interface Data<T> {
  data: T | null; // Dữ liệu fetched, có thể là null nếu chưa fetch hoặc lỗi
  loading: boolean; // Đang fetch hay không
  error: Error | null; // Lỗi nếu có khi fetch
}
interface Product {
  _id: { $oid: string };
  name: string;
  category: { $oid: string };
  price: number;
  description: string;
  image: string;
}

interface ProductsState extends Data<Product[]> {}

const initialState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetchProducts");
    }
  }
);

// Export the slice reducer and actions
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload; // Cập nhật trạng thái với dữ liệu từ API
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
// Export actions from the slice
export const { clearProducts } = productsSlice.actions;

// Define selectors for accessing the state
export const selectProductsData = (state: { products: ProductsState }) =>
  state.products.data;
export const selectProductsLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

// Export the reducer as a default export
export default productsSlice.reducer;
