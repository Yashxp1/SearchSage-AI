import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken extends JwtPayload {
  userId: number;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: number;
        name: string;
        username: string;
      };
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized - No token provided',
      });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('Error in jwt string');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized - Invalid Token' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.userId),
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    req.user = user;

    console.log('Token from cookie:', req.cookies.jwt);

    next();
  } catch (error: any) {
    console.log('Error in protectRoute middleware', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default protectRoute;
