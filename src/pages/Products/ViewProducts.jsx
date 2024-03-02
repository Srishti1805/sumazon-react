import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';

import { useNavigate, useParams } from 'react-router-dom';
import { cartState, addItem, removeItem } from '../../store/Cart';
import { Box, Button, IconButton } from '@mui/material';
import { endpoints } from '../../utils/config';
import { checkItem } from '../../utils/checkItem';
import { useHookstate } from '@hookstate/core';
import { Add, Remove } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const ViewProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [success, setSuccess] = useState(false);
  const state = useHookstate(cartState);

  // add item
  const handleAddItem = (item) => {
    const x = state.value.find((e) => e.id === item.id);
    if (x !== undefined && x.quantity === item.quantity) {
      window.alert('Max quantity reached');
      return;
    }
    addItem(item);
  };

  const handleRemoveItem = (item) => {
    removeItem(item);
  };

  // Call api to get data
  // get api
  const getData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      };

      const url = endpoints.products + `${id}/`;
      const response = await fetch(url, requestOptions);
      const json = await response.json();
      if (response.status === 200) {
        setProduct(json);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      // setProduct(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (!success) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box
          style={{
            height: '80%',
            marginTop: '5%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <h2>Item Not Found</h2>
        </Box>
      </div>
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        style={{
          height: '80%',
          marginTop: '5%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <h1>{product.name}</h1>
        <img src={product.picture} width="200px" height="200px" />
        <p style={{ width: '40%' }}>{product.description}</p>
        <p>{product.price}</p>
        {product.quantity === 0 ? (
          <>
            <p
              variant="contained"
              color="error"
              style={{ colorColor: 'orange', color: 'red' }}
            >
              Out of stock
            </p>
          </>
        ) : (
          <>
            {!checkItem(state, product.id) ? (
              <>
                {' '}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddItem(product)}
                >
                  Add to Cart
                </Button>
                <br />
              </>
            ) : (
              <>
                {' '}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    direction: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton
                    onClick={() => handleRemoveItem(product)}
                    disabled={!checkItem(state, product.id)}
                  >
                    <Remove />
                  </IconButton>
                  <Typography level="body-sm">
                    {state.value.find((e) => e.id === product.id).quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleAddItem(product)}
                    disabled={product.quantity === 0}
                  >
                    <Add />
                  </IconButton>
                </div>
                <br />
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default ViewProducts;
