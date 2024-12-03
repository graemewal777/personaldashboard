import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          Welcome to Family Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to access your family's shared dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          size="large"
          sx={{
            mt: 3,
            backgroundColor: '#4285f4',
            '&:hover': {
              backgroundColor: '#357abd',
            },
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
