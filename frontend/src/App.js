import { useEffect } from 'react';
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

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'sans-serif']
      }
    })
    store.dispatch(loadUser())
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

        {/* <Route exact path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } /> */}

        <Route exact path='/profile' Component={Profile} />
        <Route exact path='/me/update' Component={UpdateProfile}/>
        <Route exact path='/password/update' Component={UpdatePassword} />
        <Route exact path='/cart' Component={Cart} />

        <Route exact path='/login/shipping' Component={Shipping} /> {/*protected Route*/}
        <Route exact path='/order/confirm' Component={ConfirmOrder} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
