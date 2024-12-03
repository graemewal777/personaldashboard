import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container, Grid, AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import TodoWidget from './components/TodoWidget';
import WeatherWidget from './components/WeatherWidget';
import NotesWidget from './components/NotesWidget';
import LoginPage from './components/LoginPage';

interface User {
  _id: string;
  email: string;
  displayName: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/current-user`, {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Family Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TodoWidget />
            </Grid>
            <Grid item xs={12} md={4}>
              <WeatherWidget />
            </Grid>
            <Grid item xs={12} md={4}>
              <NotesWidget />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
