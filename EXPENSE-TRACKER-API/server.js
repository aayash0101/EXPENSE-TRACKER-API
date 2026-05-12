import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();

allowedOrigins = process.env.CLIENT_URL

app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running ');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



