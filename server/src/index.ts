import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todosRouter from './routes/todos';
import notesRouter from './routes/notes';
import eventsRouter from './routes/events';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todosRouter);
app.use('/api/notes', notesRouter);
app.use('/api/events', eventsRouter);

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Personal Dashboard API is running!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
