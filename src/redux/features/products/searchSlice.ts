import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState {
  searchTerm: string;
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchTerm: "",
  products: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

// Tạo thunk để tìm kiếm sản phẩm theo tên
export const fetchProductsByName = createAsyncThunk(
  "search/fetchProductsByName",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/search`, {
        params: { name },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Could not fetch products");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsByName.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;

// Define selectors for accessing the state
export const selectProductsData = (state: { search: SearchState }) =>
  state.search.products;

export const selectCounterProducts = (state: { search: SearchState }) =>
  state.search.products.length;

export const selectSearchLoading = (state: { search: SearchState }) =>
  state.search.loading;

export const selectSearchsError = (state: { search: SearchState }) =>
  state.search.error;

export default searchSlice.reducer;
