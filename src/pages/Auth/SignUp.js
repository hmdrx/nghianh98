import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Auth from './Auth';
import { api } from '../../constants/API';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../redux/alert-reducer';
import { useDispatch } from 'react-redux';
const icon = require('../../assets/images/register.png');
const greetingText = 'Create Your Account Its Free!';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const inputChangeHandler = e => {
    const value = e.target.value;
    const field = e.target.name;
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const onRegisterHandler = e => {
    e.preventDefault();
    (async () => {
      try {
        const response = await axios.post(
          `${api.base_url}/api/v1/user/register`,
          inputs
        );

        if (response.data) {
          console.log(response.data);
        }

        navigate('/login');
      } catch (error) {
        dispatch(showAlert(error.response.data.message));
      }
    })();
  };

  // const handleMouseDownPassword = event => {
  //   event.preventDefault();
  // };
  return (
    <Auth
      greetingText={greetingText}
      linkText="Already have account? "
      link="Login"
      icon={icon}
    >
      <Box component="form" maxWidth={'35rem'}>
        <Typography textAlign="center" variant="h6">
          Sign Up
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          variant="standard"
          type="text"
          value={inputs?.name}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          variant="standard"
          type="email"
          value={inputs?.email}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Create Password"
          variant="standard"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={inputs?.password}
          onChange={inputChangeHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Confirm Password"
          variant="standard"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={inputs?.confirmPassword}
          onChange={inputChangeHandler}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" component="span">
            By signing up you are accepting our{' '}
            <Link
              href="#"
              variant="caption"
              underline="hover"
              color="info.main"
            >
              terms&conditions
            </Link>
          </Typography>

          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            // onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 6 }}
          onClick={onRegisterHandler}
        >
          Sign Up
        </Button>
      </Box>
    </Auth>
  );
};

export default SignUp;
