import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  console.log('Server is running on PORT 5000');
});
