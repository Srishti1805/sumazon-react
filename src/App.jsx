import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ListProducts from './pages/Products/ListProducts';
import ViewProducts from './pages/Products/ViewProducts';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Checkout from './pages/Checkout/Checkout';
import EditUser from './pages/EditUser/EditUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Box
        component="div"
        height="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // backgroundColor="red"
      >
        {/* Add routes */}
        <Routes>
          {/* Non protected */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="products" element={<ListProducts />} />
          <Route path="products/:id" element={<ViewProducts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/edit/user/:id" element={<EditUser />} />

          {/* Page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
      <ToastContainer />
    </>
  );
}

export default App;
