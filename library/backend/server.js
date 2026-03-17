import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routes (you will create these in the routes folder)
// import authRoutes from './routes/authRoutes.js';
// import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Base Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/books', bookRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Library API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
