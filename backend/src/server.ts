import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import lessonRoutes from './routes/lessons';
import exerciseRoutes from './routes/exercises';
import userRoutes from './routes/users';
import userProgressRoutes from './routes/userProgress';

dotenv.config();
const app = express();

// Configure CORS to allow requests from your frontend
// Enable CORS
console.log('CLIENT_URL', process.env.CLIENT_URL);
app.use(cors({
  origin: 'http://localhost:3000',  // explicitly your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // if you want cookies/auth headers; remove if unused
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/lessons", lessonRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user-progress", userProgressRoutes);


const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
