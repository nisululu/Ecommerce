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
import { useDispatch, useSelector } from 'react-redux';
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
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import Orders from './components/admin/Orders';
import UpdateOrder from './components/admin/UpdateOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Contact from './components/layout/contactus/Contact';
import Aboutus from './components/layout/aboutus/Aboutus';
import PageNotFound from './components/layout/404/PageNotFound'
import store from './store'


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const data = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data && data.data.stripeApiKey)
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
      {isAuthenticated && <UserOptions user={user && user} />}

      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/product/:id' Component={ProductDetails} />
        <Route exact path='/products' Component={Products} />
        <Route path='/products/:keyword' Component={Products} />
        <Route exact path='/search' Component={Search} />
        <Route exact path='/login' Component={LoginSignup} />
        <Route exact path='/contact' Component={Contact} />
        <Route exact path='/aboutus' Component={Aboutus} />

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
          <Route exact path='/login/shipping' element={<Shipping />} /> {/*protected Route*/}
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

        <Route element={<ProtectedRoute isAdmin={true} />}>
          {/* Admin Section */}
          <Route exact path='/admin/dashboard' Component={Dashboard} />
          <Route exact path='/admin/products' Component={ProductList} />
          <Route exact path='/admin/product/create' Component={NewProduct} />
          <Route exact path='/admin/product/:id' Component={UpdateProduct} />
          <Route exact path='/admin/orders' Component={Orders} />
          <Route exact path='/admin/order/:id' Component={UpdateOrder} />
          <Route exact path='/admin/users' Component={UsersList} />
          <Route exact path='/admin/user/:id' Component={UpdateUser} />
          <Route exact path='/admin/reviews' Component={ProductReviews} />
        </Route>

        <Route path='*' Component={PageNotFound} />

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
