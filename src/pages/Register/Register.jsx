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

//
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Register = () => {
  const navigate = useNavigate();

  // local state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(``);
  const [username, setUsername] = useState();
  const [address, setAddress] = useState(``);
  const [number, setNumber] = useState(``);
  const [profilePicture, setProfilePicture] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // window.alert('I am clicking');
    // const headers = { 'Content-Type': `application/json` };

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('address', address);
    data.append('number', number);
    data.append('profilePicture', profilePicture);
    const requestOptions = {
      method: 'POST',
      body: data,
    };

    const response = await fetch(endpoints.register, requestOptions);
    const json = await response.json();
    if (response.status === 201) {
      navigate('/login');
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
      <h2 style={{ alignItems: 'center' }}>Register</h2>
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
          {/* email */}
          <TextField
            type="text"
            variant="outlined"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          {/* address */}
          <TextField
            type="text"
            variant="outlined"
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            fullWidth
          />
          {/* Number */}
          <TextField
            type="tel"
            variant="outlined"
            label="Number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            fullWidth
          />
          {/* file */}
          <p>Profile Picture</p>
          <TextField type="file" onChange={handleFileChange} />
          <Button variant="contained" type="submit">
            Register
          </Button>
          <small>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'p' }}>
              Login Here
            </Link>
          </small>
        </Stack>
      </form>
    </div>
  );
};

export default Register;
