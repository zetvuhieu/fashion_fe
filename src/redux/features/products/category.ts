import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Data<T> {
  data: T | null; // Dữ liệu fetched, có thể là null nếu chưa fetch hoặc lỗi
  loading: boolean; // Đang fetch hay không
  error: Error | null; // Lỗi nếu có khi fetch
}

const API_URL = import.meta.env.VITE_API_URL;

interface Categories {
  _id: { $oid: string };
  name: string;
}

interface CategoriesState extends Data<Categories[]> {}

const initialState: CategoriesState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get<Categories[]>(
        `${API_URL}/api/categories`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetchCategories");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on pending
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Categories[]>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null; // Reset error on success
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

// Define selectors for accessing the state
export const selectCategoriesData = (state: { categories: CategoriesState }) =>
  state.categories.data;

export const selectCategoriesLoading = (state: {
  categories: CategoriesState;
}) => state.categories.loading;

export const selectCategoriesError = (state: { categories: CategoriesState }) =>
  state.categories.error;

export default categorySlice.reducer;
