import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import mentorshipRoutes from './routes/mentorshipRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import educatorRoutes from './routes/educatorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import path from 'path';

// Env config load karo
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    const isAllowed =
      !origin ||
      origin === 'http://localhost:5173' ||
      /\.vercel\.app$/.test(origin) ||
      origin === process.env.FRONTEND_URL;
    callback(null, isAllowed);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('ShikshaSetu Backend API');
});

// APIs route mount karo
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/educator', educatorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const startServer = async () => {
  await connectDB();

  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();

export default app;
