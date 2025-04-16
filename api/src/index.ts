import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
