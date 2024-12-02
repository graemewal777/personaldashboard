import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Grid, AppBar, Toolbar, Typography } from '@mui/material';
import TodoWidget from './components/TodoWidget';
import WeatherWidget from './components/WeatherWidget';
import NotesWidget from './components/NotesWidget';

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
