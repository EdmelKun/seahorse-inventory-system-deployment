import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import logo from '../images/officialLogo.png';

import { login } from './loginFunctions';

export default function LoginPage() {
  const [visibility, setVisibilty] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const landscape = useMediaQuery('(orientation: landscape)');

  const togglePasswordVisiblity = () => {
    setVisibilty(!visibility);
  };

  const handleLogin = () =>
    login(password, username).then((result) => {
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(true);
        setPassword('');
      }
    });

  // eslint-disable-next-line consistent-return
  const displayError = () => {
    if (errorMessage) {
      return (
        <FormHelperText error id="error-text" sx={{ fontSize: 13 }}>
          Incorrect username/password!
        </FormHelperText>
      );
    }
  };

  const displayLogin = () => (
    <Grid
      container
      sx={{
        flexDirection: landscape ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'lightgray',
        minWidth: '100vw',
        minHeight: '100vh', // changed from height to minHeight
      }}
    >
      <Grid item>
        <Card
          sx={{
            flexDirection: landscape ? 'row' : 'column',
            width: { xs: '90vw', sm: '75vw', md: '60vw', lg: '50vw' },
            height: 'auto', // change to auto from landscape ? 'auto' : '75vh',
            borderRadius: '14px',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <CardMedia
            sx={{
              display: 'flex',
              borderRadius: '50%',
              width: { xs: 150, sm: 200 },
              height: { xs: 150, sm: 200 },
              mr: 'auto',
              ml: 'auto',
              mt: 4,
              mb: 2,
            }}
            component="img"
            image={logo}
            alt="seahorse"
          />
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mt: 3, color: 'gray' }}
          >
            Enter your credentials to access your account.
          </Typography>
          <Grid
            item
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <EmailIcon sx={{ color: '#1976d2', mt: 3.5 }} />
              <TextField
                id="login-username"
                label="Username"
                variant="standard"
                sx={{ width: '65%', mt: 1 }}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <LockIcon sx={{ color: '#1976d2', mt: 4 }} />
              <FormControl variant="standard" sx={{ width: '65%', mt: 2 }}>
                <InputLabel htmlFor="password-label">Password</InputLabel>
                <Input
                  id="login-password"
                  type={visibility ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorMessage(false);
                  }}
                  endAdornment={
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      {visibility ? (
                        <VisibilityIcon
                          sx={{ color: 'gray' }}
                          onClick={togglePasswordVisiblity}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ color: 'gray' }}
                          onClick={togglePasswordVisiblity}
                        />
                      )}
                    </InputAdornment>
                  }
                />
                {displayError()}
              </FormControl>
            </Box>
            <Grid
              item
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                mb: 2, // Add bottom margin here
              }}
            >
              <Button
                variant="contained"
                sx={{ width: '69%', mt: 4 }}
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
  return displayLogin();
}
