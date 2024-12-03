import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { authRouter, isAuthenticated } from './routes/auth';
import './config/passport';
import todosRouter from './routes/todos';
import notesRouter from './routes/notes';
import eventsRouter from './routes/events';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://personaldashboard-1.onrender.com'
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session middleware with MongoDB store
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // Session TTL (1 day)
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/api/todos', todosRouter);
app.use('/api/notes', notesRouter);
app.use('/api/events', eventsRouter);

// Protected route example
app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

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

// MongoDB connection setup
mongoose.set('strictQuery', false); // Handle deprecation warning

// Debug logging
console.log('Attempting MongoDB connection...');
console.log('MongoDB URI format check:', process.env.MONGODB_URI?.split('@')[0].replace(/:[^:]*@/, ':****@'));

// Connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Mongoose error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error event:', {
    name: err.name,
    message: err.message,
    code: err.code,
    codeName: (err as any).codeName,
  });
});

mongoose.connection.on('connecting', () => {
  console.log('Connecting to MongoDB...');
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Attempt connection
mongoose.connect(process.env.MONGODB_URI!, mongooseOptions)
  .then(() => {
    console.log('MongoDB connection successful');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: (error as any).codeName,
      errorLabels: Array.from((error as any)[Symbol.for('errorLabels')] || []),
    });

    // Additional authentication debugging
    if (error.message?.includes('auth')) {
      console.log('Authentication Error Detected - Debug Info:');
      console.log('1. Check if MongoDB username is correct');
      console.log('2. Verify password in Render environment variables');
      console.log('3. Confirm IP whitelist settings in MongoDB Atlas');
      console.log('4. Check if database user has correct permissions');
    }

    process.exit(1);
  });
