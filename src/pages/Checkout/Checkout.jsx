import { useHookstate } from '@hookstate/core';
import React from 'react';
import { cartState, removeItem } from '../../store/Cart';
import Header from '../../components/Header/Header';
import { Box, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardOverflow } from '@mui/joy';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { checkItem } from '../../utils/checkItem';
import { toast } from 'react-toastify';

const Checkout = () => {
  const state = useHookstate(cartState);
  const navigate = useNavigate();

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
                  <img src={item.picture}height="200px"width="200px" />
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveItem(item)}
                        style={{ colorColor: 'red' }}
                      >
                        Remove Item
                      </Button>
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
