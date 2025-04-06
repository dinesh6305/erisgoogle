import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null,  // Add an error state to handle errors
};

export const fetchAllFilterProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

export const fetchLimitedProducts = createAsyncThunk(
  '/products/fetchLimitedProducts',
  async ({ filterParams, sortParams, limit }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
      limit: limit || 5,  // Default to 5 if limit is not provided
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/limited?${query}`
    );

    return result?.data;
  }
);

export const fetchProductsDetails = createAsyncThunk(
  '/products/fetchProductsDetails',
  async ({ id }) => {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const ShopProductsSlice = createSlice({
  name: 'ShoppingProducts',
  initialState,
  reducers: {
    resetProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilterProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error on new request
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;  // Capture error message
      })
      .addCase(fetchLimitedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error on new request
      })
      .addCase(fetchLimitedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchLimitedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;  // Capture error message
      })
      .addCase(fetchProductsDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Reset error on new request
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        state.error = action.error.message;  // Capture error message
      });
  },
});

export const { resetProductDetails } = ShopProductsSlice.actions;
export const selectProducts = (state) => state.shopProducts.productList;
export const selectProductDetails = (state) => state.shopProducts.productDetails;
export const selectIsLoading = (state) => state.shopProducts.isLoading;
export const selectError = (state) => state.shopProducts.error;

export default ShopProductsSlice.reducer;