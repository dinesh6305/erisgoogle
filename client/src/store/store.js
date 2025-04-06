import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './Adminproduct-slice/index'
import  ShopProductsSlice from './shop/shopproduct'
import cartReducer from './shop/cart-slice';
import AddressReducer from './Address/Adress-slice';

const store = configureStore({
    reducer: {  // Fix: "reducer" instead of "reducers"
       auth: authReducer,
       adminProducts:adminProductsSlice,
       shopProducts:ShopProductsSlice,
       cart: cartReducer,
       shopAddress: AddressReducer,
    }
});

export default store;
