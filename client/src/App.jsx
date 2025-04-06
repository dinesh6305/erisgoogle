import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./assets/components/auth/layout";
import Authlogin from "./assets/pages/auth/login";
import Authregister from "./assets/pages/auth/register";
import Adminlayout from './assets/components/admin-view/Adminlayout';
import Admindashboard from './assets/pages/admin-view/dashboard';
import Adminproducts from './assets/pages/admin-view/products';
import Adminorders from './assets/pages/admin-view/orders';
import Adminfeature from './assets/pages/admin-view/features';
import Shoppinglayout from './assets/components/shoppingview/Layout';
import PageNotfound from './assets/pages/pagenotfound';
import ShoppingHome from './assets/pages/shoppingview/home';
import ShoppingListing from './assets/pages/shoppingview/listing';
import ShoppingAcc from './assets/pages/shoppingview/accountpage';
import Shoppingcheckout from './assets/pages/shoppingview/checkout';
import Unauthpage from './assets/pages/unauthpage';
import { Toaster } from "react-hot-toast";
import CheckAuth from './assets/components/common/checkauth';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import Contactpage from './assets/pages/shoppingview/Contact';
import Aboutpage from './assets/pages/shoppingview/About';

import ProductDetail from './assets/components/shoppingview/ProductDetails';
import Cart from './assets/components/Cart/cart';
import StaticCartPage from './assets/components/Cart/cartdemo';
import Earphone from './assets/pages/Headphones';
import Earbuds from './assets/pages/earbuds';
import Headphones from './assets/pages/Headphones';
import Neckband from './assets/pages/Neckbands';


const App = () => {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading....</div>;

  console.log(isLoading, user, "fromapp.js");

  return (
    <div className="flex flex-col ">

      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>}>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <Adminlayout />
        </CheckAuth>}>
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="product" element={<Adminproducts />} />
          <Route path="order" element={<Adminorders />} />
          <Route path="features" element={<Adminfeature />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={
          <Shoppinglayout />}>

          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={

            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingAcc />
            </CheckAuth>
          } />
          <Route path="checkout" element={<Shoppingcheckout />} />
          <Route path="contact" element={<Contactpage />} />
          <Route path="About" element={<Aboutpage />} />
          <Route path="headphones" element={<Headphones />} />
          <Route path="neckbands" element={<Neckband />} />
          <Route path="earbuds" element={<Earbuds />} />

          <Route path="cart" element={
            <Cart userId={user?.id} />
          } />

        </Route>
        <Route path="/cart1" element={<StaticCartPage />} />


        <Route path="*" element={<PageNotfound />} />
        <Route path="/unauth-page" element={<Unauthpage />} />
        <Route path="/product/:id" element={<ProductDetail userId={user?.id} />} />

      </Routes>
    </div>
  );
};

export default App;
