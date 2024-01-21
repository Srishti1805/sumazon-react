import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';

import { useNavigate, useParams } from 'react-router-dom';
import { cartState, addItem, removeItem } from '../../store/Cart';
import { Box, Button } from '@mui/material';
import { endpoints } from '../../utils/config';
import { checkItem } from '../../utils/checkItem';
import { useHookstate } from '@hookstate/core';

const ViewProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const state = useHookstate(cartState);

  // add item
  const handleAddItem = (item) => {
    // const newItem = { id: Date.now(), name: 'New Item' }; // Customize the item structure as needed
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
      setProduct(json);
    } catch (error) {
      console.log(error);
    }
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
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveItem(product)}
              style={{ colorColor: 'red' }}
            >
              Remove Item
            </Button>
            <br />
          </>
        )}
      </Box>
    </div>
  );
};

export default ViewProducts;
