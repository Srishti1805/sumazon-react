import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336
const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // backgroundColor: white,
      }}
    >
      <Typography variant="h4" style={{ color: 'black' }}>
        404 not found
      </Typography>
    </Box>
  );
};

export default PageNotFound;
