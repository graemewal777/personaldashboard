import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WidgetContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const WeatherIcon = styled(WbSunnyIcon)(({ theme }) => ({
  fontSize: '48px',
  color: theme.palette.warning.main,
  marginBottom: theme.spacing(2),
}));

const WeatherWidget = () => {
  return (
    <WidgetContainer>
      <WeatherIcon />
      <Typography variant="h4" gutterBottom>
        22°C
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Vancouver, BC
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" color="textSecondary">
          Sunny with light clouds
        </Typography>
      </Box>
    </WidgetContainer>
  );
};

export default WeatherWidget;
