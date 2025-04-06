import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Configure axios to retry failed requests with exponential backoff
axiosRetry(axios, { 
  retries: 3, 
  retryDelay: axiosRetry.exponentialDelay 
});

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
  const response = await axios.get(`${import.meta.env.VITE_PORT}/api/shop/cart/${userId}`);
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (cartData) => {
  const response = await axios.post(`${import.meta.env.VITE_PORT}/api/shop/cart/add`, cartData);
  return response.data;
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ userId, itemId, quantity }) => {
  const response = await axios.put(`${import.meta.env.VITE_PORT}/api/shop/cart/updateQuantity`, {
    userId,
    itemId,
    quantity,
  });
  return response.data;
});

export const deleteCartItem = createAsyncThunk('cart/deleteItem', async ({ userId, itemId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_PORT}/api/shop/cart/${userId}/item/${itemId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Failed to delete item' });
  }
});

export const fetchCartItemCount = createAsyncThunk('cart/fetchCartItemCount', async (userId) => {
  const response = await axios.get(`${import.meta.env.VITE_PORT}/api/shop/cart/count/${userId}`);
  return response.data;
});

export const emptyCart = createAsyncThunk('cart/emptyCart', async (userId) => {
  const response = await axios.delete(`${import.meta.env.VITE_PORT}/api/shop/cart/${userId}/empty`);
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    itemCount: 0,
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Update Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Delete Item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.cart;
        state.items = action.payload.data.items;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCartItemCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItemCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemCount = action.payload.data.itemCount;
        state.error = null;
      })
      .addCase(fetchCartItemCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Empty Cart
      .addCase(emptyCart.fulfilled, (state) => {
        state.cart = null;
        state.items = [];
        state.itemCount = 0;
      });
  },
});

export default cartSlice.reducer;