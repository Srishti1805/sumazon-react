import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Stack,
  Input,
  InputLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { endpoints } from '../../utils/config';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();

  // local state
  const [password, setPassword] = useState(``);
  const [username, setUsername] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { 'Content-Type': `application/json` };
    const body = {
      username: username,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    };

    const response = await fetch(endpoints.login, requestOptions);
    const json = await response.json();
    if (response.status === 200) {
      var decoded = jwtDecode(json.access);
      const userId = decoded.user_id;
      localStorage.setItem('refreshToken', json.refresh);
      localStorage.setItem('accessToken', json.access);
      localStorage.setItem('userId', userId);

      // user api
      const userResponse = await fetch(endpoints.users + `${userId}/`, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          'Content-Type': `application/json`,
        },
      });

      const userJson = await userResponse.json();
      if (userResponse.status === 200) {
        localStorage.setItem('username', userJson.username);
        localStorage.setItem('profilePicture', userJson.profilePicture);
        navigate('/products');
        return;
      }
      return;
    } else {
      toast.error(`${JSON.stringify(json)}`, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      style={{
        width: '30%',
        height: '80%',
        // backgroundColor: 'red',
      }}
    >
      <h2 style={{ alignItems: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
          {/* username */}
          <TextField
            type="text"
            variant="outlined"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            fullWidth
            // required
          />

          {/* password */}
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
          <small>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'p' }}>
              Sign Up
            </Link>
          </small>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
