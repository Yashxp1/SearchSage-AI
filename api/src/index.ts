import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import promptRouter from './routes/prompt.routes';
import cors from 'cors';

dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1', authRouter);
app.use('/api/v1', promptRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
