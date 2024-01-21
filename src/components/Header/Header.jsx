import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../utils/config';
import { toast } from 'react-toastify';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHookstate } from '@hookstate/core';
import { cartState, addItem, removeItem } from '../../store/Cart';

const Header = () => {
  const navigate = useNavigate();
  const state = useHookstate(cartState);

  // handle cart click
  const handleCartClick = () => {
    // Handle your cart icon click logic here
    console.log('Cart icon clicked');
  };

  // handle logout
  const handleLogout = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
    };
    const body = {
      refresh: localStorage.getItem(`refreshToken`) || ``,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    };

    const response = await fetch(endpoints.logout, requestOptions);
    if (response.status === 205) {
      localStorage.clear();
      navigate('/login');
      return;
    } else {
      json = await response.json();
      toast.error(`${JSON.stringify(json)}`, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Left: Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sumazon Hi {username}!
        </Typography>

        {/* Right: Cart Icon, User Icon, and Logout Button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="shopping cart"
          onClick={() => navigate(`/checkout`)}
        >
          {state.get().length}
          <ShoppingCartIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={() => navigate(`/edit/user/${userId}`)}
        >
          <Avatar
            alt="Remy Sharp"
            src={localStorage.getItem('profilePicture')}
          />

          {/* <AccountCircleIcon src={localStorage.getItem('profilePicture')} /> */}
        </IconButton>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// style={{
//     background: '#0F1111',
//     height: '8%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'space-between',
//     color: 'white',
//   }}
