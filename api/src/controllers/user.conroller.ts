import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../db/prisma';
import generateToken from '../utils/generateToken';

const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      res.status(400).json({ errors });
      return;
    }

    const { name, username, password } = result.data;

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      res.status(400).json({
        success: false,
        error: 'Username already exists',
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    if (newUser) {
      generateToken(String(newUser.id), res);

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ success: false, error: 'Invalid user data' });
    }
  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      res.status(400).json({ errors });
      return;
    }

    const { username, password } = result.data;

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(400).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        error: 'Incorrect password',
      });
      return;
    }

    generateToken(String(user.id), res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  } catch (error: any) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
