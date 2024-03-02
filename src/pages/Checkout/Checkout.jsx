import { useHookstate } from '@hookstate/core';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { Box, Button, Card, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardOverflow } from '@mui/joy';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { checkItem } from '../../utils/checkItem';
import { toast } from 'react-toastify';
import { Add, Remove } from '@mui/icons-material';
import { cartState, addItem, removeItem } from '../../store/Cart';
import { endpoints } from '../../utils/config';

const Checkout = () => {
  const state = useHookstate(cartState);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // add item
  const handleAddItem = (item) => {
    const x = products.find((e) => e.id === item.id);
    console.log(x);
    if (x !== undefined && x.quantity === item.quantity) {
      window.alert('Max quantity reached');
      return;
    }
    addItem(item);
  };
  const getData = async (query) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      };
      if (query !== null && query !== undefined) {
        var url = endpoints.products + `?search=${query}`;
      } else {
        var url = endpoints.products;
      }
      const response = await fetch(url, requestOptions);
      const json = await response.json();
      setProducts([...json]);
      // setProducts(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // remove item
  const handleRemoveItem = (item) => {
    removeItem(item);
  };
  // const handlePay
  const handlePay = async (e) => {
    toast.success(`Payment Success Full`, {
      position: 'top-center',
      autoClose: 1000,
    });
    state.set([]);
    navigate('/products');
  };

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
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          {state.get().length === 0 ? (
            <div>
              <h1>No products selected</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/products`)}
              >
                List Products
              </Button>
            </div>
          ) : (
            <></>
          )}
          {state.get().map((item, index) => {
            return (
              <Card
                variant="outlined"
                // sx={{ width: 320 }}
                style={{ marginTop: '16px' }}
              >
                <CardOverflow
                  style={{
                    objectFit: 'fit',
                  }}
                >
                  <img src={item.picture} height="200px" width="200px" />
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">{item.name}</Typography>
                  <Typography level="body-sm">${item.price}</Typography>
                  {!checkItem(state, item.id) ? (
                    <>
                      {' '}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddItem(item)}
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
                          onClick={() => handleRemoveItem(item)}
                          disabled={!checkItem(state, item.id)}
                        >
                          <Remove />
                        </IconButton>
                        <Typography level="body-sm">
                          {state.value.find((e) => e.id === item.id).quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleAddItem(item)}
                          disabled={item.quantity === 0}
                        >
                          <Add />
                        </IconButton>
                      </div>
                      <br />
                      <br />
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {state.get().length !== 0 && (
            <>
              <h2>
                {' '}
                Total: {state.get().reduce((sum, item) => sum + item.price, 0)}
              </h2>
              <Button
                variant="contained"
                // color="error"
                onClick={handlePay}
                style={{
                  marginTop: '10px',
                  marginBottom: '40px',
                  width: '20%',
                }}
              >
                Pay
              </Button>
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Checkout;
