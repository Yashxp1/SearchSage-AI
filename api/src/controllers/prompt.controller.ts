import { Response, Request } from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '../db/prisma';

const apiKey = process.env.GEMINI_API as string;
const genAI = new GoogleGenerativeAI(apiKey);

const SearchWithSerpAPI = async (query: string) => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google',
        q: query,
        api_key: process.env.SERP_API,
      },
    });

    const results =
      response.data.organic_results.map((result: any) => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet,
      })) || [];

    return results;
  } catch (error) {
    console.error('Error fetching from SerpAPI: ', error);
    return [];
  }
};

export const createPrompt = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(
      `Summarize the user's input below and clearly state what the user is trying to achieve or find. Be concise and specific and then name the thing that user might be looking for: ${content}`
    );

    const response = result.response;
    const summary = response.text() || 'No summary generated';

    const searchResults = await SearchWithSerpAPI(summary);

    const savedPrompt = await prisma.prompt.create({
      data: {
        userId,
        content,
        summary,
      },
    });

    res.status(200).json({
      id: savedPrompt.id,
      content,
      summary,
      searchResults,
      createdAt: savedPrompt.createdAt,
    });
  } catch (error) {
    console.error('Error calling AI API:', error);
    res
      .status(500)
      .json({ message: 'Something went wrong while generating summary' });
  }
};
