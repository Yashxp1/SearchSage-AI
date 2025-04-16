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
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        content: [
          {
            parts: [
              {
                text: `Summarize what this user might be looking for: ${content}`,
              },
            ],
          },
        ],
      }
    );

    const summary = aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      console.error(
        'Could not extract text from AI response:',
        aiResponse.data
      );

      res.status(500).json({ message: 'Failed to parse AI response' });
      return;
    }

    await prisma.prompt.create({
      data: {
        userId,
        content,
       summary,
      },
    });

    res.status(200).json({ summary });
    
  } catch (error) {
    console.error('Error calling AI API:', error);
    res
      .status(500)
      .json({ message: 'Something went wrong while generating summary' });
  }
};
