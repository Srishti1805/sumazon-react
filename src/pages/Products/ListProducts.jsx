import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Box, Divider, IconButton, TextField } from '@mui/material';
import { endpoints } from '../../utils/config';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AspectRatio } from '@mui/icons-material';
import CardOverflow from '@mui/joy/CardOverflow';
import { useNavigate } from 'react-router-dom';
import { cartState, addItem, removeItem } from '../../store/Cart';
import { useHookstate } from '@hookstate/core';
import { checkItem } from '../../utils/checkItem';
import { Add, Remove } from '@mui/icons-material';
import { toast } from 'react-toastify';

const ListProducts = () => {
  const [search, setSearch] = useState();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const items = cartState.getState();
  const state = useHookstate(cartState);

  // add item
  const handleAddItem = (item) => {
    const x = state.value.find((e) => e.id === item.id);
    if (x !== undefined && x.quantity === item.quantity) {
      toast.error(`Max quantity reached`, {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    addItem(item);
  };

  const handleRemoveItem = (item) => {
    removeItem(item);
  };
  // get api
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
  // handleSearch
  const handleSearch = async (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    getData(search);
  };
  useEffect(() => {
    getData();
  }, []);

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
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          style={{
            display: 'flex',
            flexDirection: 'column',
            // width: '80%',
            marginLeft: '8%',
            justifyContent: 'center',
            marginRight: '8%',
            marginTop: '10px',
          }}
          variant="outlined"
          // style={{ width: '100%', alignItems: 'center' }}
          onChange={(e) => handleSearch(e)}
        />
        {/* search bar */}
        <div
          style={{
            display: 'flex',
            // flexDirection: 'wrap',
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '26px',
            gap: '1rem',
          }}
        >
          {products.length === 0 ? (
            <div>
              <h1>No products</h1>
            </div>
          ) : (
            <></>
          )}
          {products.map((item, index) => {
            // console.log(state.get());
            return (
              <Card
                variant="outlined"
                // sx={{ width: 320 }}
                style={{ marginTop: '16px' }}
              >
                <CardOverflow
                  style={{
                    objectFit: 'fill',
                  }}
                >
                  <img src={item.picture} height="200px" width="200px" />
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">{item.name}</Typography>
                  <Typography level="body-sm">${item.price}</Typography>
                  {item.quantity === 0 ? (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        style={{ colorColor: 'orange' }}
                      >
                        Out of stock
                      </Button>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={() => {
                          navigate(`/products/${item.id}`);
                        }}
                      >
                        View Product
                      </Button>
                    </>
                  ) : (
                    <>
                      {!checkItem(state, item.id) ? (
                        <>
                          {' '}
                          <Typography level="body-sm">
                            In stock: {item.quantity}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddItem(item)}
                          >
                            Add to Cart
                          </Button>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '10px' }}
                            onClick={() => {
                              navigate(`/products/${item.id}`);
                            }}
                          >
                            View Product
                          </Button>
                        </>
                      ) : (
                        <>
                          {' '}
                          <Typography level="body-sm">
                            In stock: {item.quantity}
                          </Typography>
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
                              {
                                state.value.find((e) => e.id === item.id)
                                  .quantity
                              }
                            </Typography>
                            <IconButton
                              onClick={() => handleAddItem(item)}
                              disabled={item.quantity === 0}
                            >
                              <Add />
                            </IconButton>
                          </div>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '10px' }}
                            onClick={() => {
                              navigate(`/products/${item.id}`);
                            }}
                          >
                            View Product
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Box>
    </div>
  );
};

export default ListProducts;
