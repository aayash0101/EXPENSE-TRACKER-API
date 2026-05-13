import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'
import statsRoutes from './routes/statsRoute.js'

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = process.env.CLIENT_URL

app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/stats', statsRoutes)
app.get('/', (req, res) => {
    res.send('API is running ');
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



