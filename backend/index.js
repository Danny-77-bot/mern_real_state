import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
