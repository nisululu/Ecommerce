import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader'
import React from 'react';
import Home from './components/home/Home'
import ProductDetails from './components/product details/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import LoginSignup from './components/User/login Signup/LoginSignup';
import Profile from './components/User/profile/Profile';
import { loadUser } from './actions/userAction';
import store from './store'
import { useSelector } from 'react-redux';
import UserOptions from './components/layout/header/UserOptions';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/User/profile/UpdateProfile';
import UpdatePassword from './components/User/login Signup/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from './components/cart/Success';
import Order from './components/order/Order';
import OrderDetails from './components/order/OrderDetails'

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'sans-serif']
      }
    })
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route path='/products/:keyword' Component={Products} />
        <Route exact path='/search' Component={Search} />
        <Route exact path='/login' Component={LoginSignup} />

        {/* For Protected Routes */}
        {/* <Route exact path='/profile' element={
              <ProtectedRoute exact path='/profile' Component={Profile} />
          } /> */}

        {/* <Route path='/profile' Component={
          <ProtectedRoute exact path='/profile' Component={Profile} />
        } /> */}

        {/* <Route exact path='/profile' Component={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } /> */}

        <Route element={<ProtectedRoute />}>
          <Route exact path='/profile' Component={Profile} />
          <Route exact path='/me/update' Component={UpdateProfile} />
          <Route exact path='/password/update' Component={UpdatePassword} />
          <Route exact path='/cart' Component={Cart} />
          <Route exact path='/login/shipping' Component={Shipping} /> {/*protected Route*/}
          <Route exact path='/order/confirm' Component={ConfirmOrder} />

          <Route exact path='/process/payment' element={
            stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          } />
          <Route exact path='/success' Component={Success} />
          <Route exact path='/orders/me' Component={Order} />
          <Route exact path='/order/:id' Component={OrderDetails} />
        </Route>

        {/* <Route exact path='/profile' Component={Profile} /> */}
        {/* <Route exact path='/me/update' Component={UpdateProfile} />
        <Route exact path='/password/update' Component={UpdatePassword} />
        <Route exact path='/cart' Component={Cart} /> */}

        {/* <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path='/process/payment' Component={Payment} />
        </Elements> */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
