import { Request, Response } from 'express';
import axios from 'axios';
import prisma from '../db/prisma';

const apiKey = process.env.GEMINI_API;

export const createPrompt = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const aiResponse = await axios.post(
      'https://api.gemini.com/v1/products',
      {
        prompt: content,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const result = aiResponse.data;

    await prisma.prompt.create({
      data: {
        userId,
        content,
        result,
      },
    });

    res.status(200).json({ result });
  } catch (error) {
    console.error('Error calling AI API:', error);
    res
      .status(500)
      .json({ message: 'Something went wrong while generating summary' });
  }
};
