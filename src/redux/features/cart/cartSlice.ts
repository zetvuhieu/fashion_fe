import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for CartItem and CartState
interface CartItem {
  id: { $oid: string };
  name: string;
  price: number;
  quantity: number;
  size?: string | number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

// Load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  try {
    const parsedCart = cart ? JSON.parse(cart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (e) {
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Initialize state with data from localStorage
const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      // Ensure state.items is an array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      const existingItem = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      saveCartToLocalStorage(state.items); // Save cart to localStorage
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; size?: string | number }>
    ) => {
      const { id, size } = action.payload;

      // Ensure state.items is an array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      state.items = state.items.filter(
        (item) => item.id !== id || item.size !== size
      );
      saveCartToLocalStorage(state.items); // Save cart to localStorage
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Save cart to localStorage
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Define selectors for accessing the state
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.length;

export default cartSlice.reducer;
