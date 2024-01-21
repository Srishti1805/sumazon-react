import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { endpoints } from '../../utils/config';
import { Avatar, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [image, setImage] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(image);
  };
  // const data = useState({});
  const handleSave = async (e) => {
    e.preventDefault();

    console.log(typeof image);
    if (image !== undefined) {
      const data = new FormData();
      data.append('email', user.email);
      data.append('address', user.address);
      data.append('number', user.number);
      data.append('profilePicture', image);
      const requestOptions = {
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      };

      const response = await fetch(
        endpoints.users + `${user.id}/`,
        requestOptions
      );
      const json = await response.json();
      if (response.status === 200) {
        localStorage.setItem('username', json.username);
        localStorage.setItem('profilePicture', json.profilePicture);
        navigate('/products');
        return;
      } else {
        toast.error(`${JSON.stringify(json)}`, {
          position: 'top-center',
          autoClose: 1000,
        });
        return;
      }
    } else {
      const requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          email: user.email,
          address: user.address,
          number: user.number,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      };
      const response = await fetch(
        endpoints.users + `${user.id}/`,
        requestOptions
      );
      const json = await response.json();
      if (response.status === 200) {
        localStorage.setItem('username', json.username);
        localStorage.setItem('profilePicture', json.profilePicture);
        navigate('/products');
        return;
      } else {
        toast.error(`${JSON.stringify(json)}`, {
          position: 'top-center',
          autoClose: 1000,
        });
        return;
      }
    }
  };
  //api call
  const getData = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      };

      const url = endpoints.users + `${id}/`;
      const response = await fetch(url, requestOptions);
      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.log(error);
    }
  };

  // handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          width: '30%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          // backgroundColor: 'red',
        }}
      >
        <h3>Profile Page</h3>
        <Avatar
          alt="Remy Sharp"
          src={user.profilePicture}
          sx={{ width: 100, height: 100 }}
        />
        <h2>{user.username}</h2>
        <form
          onSubmit={handleSave}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {/* email */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Email</p>
            <TextField
              type="text"
              variant="outlined"
              // label="Email"
              name={`email`}
              onChange={handleInputChange}
              value={user.email}
            />
          </div>

          {/* number */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Number</p>
            <TextField
              type="text"
              variant="outlined"
              // label="Number"
              name={`number`}
              onChange={handleInputChange}
              value={user.number}
            />
          </div>

          {/* address */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Address</p>

            <TextField
              type="text"
              variant="outlined"
              // label="Address"
              name={`address`}
              onChange={handleInputChange}
              value={user.address}
            />
          </div>
          {/* Profile Picture */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Profile Picture</p>
            <TextField type="file" onChange={handleFileChange} />
          </div>
          <Button
            variant="contained"
            type="submit"
            onSubmit={handleSave}
            style={{ marginBottom: '60px', marginTop: '20px' }}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
