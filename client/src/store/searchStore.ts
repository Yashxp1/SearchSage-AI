import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';

interface searchResult {
  title: string;
  link: string;
  snippet: string;
}

interface PromptData {
  id: string;
  content: string;
  summary: string;
  searchResult: searchResult[];
  createdAt: string;
}

interface PromptState {
  prompt: PromptData | null;
  isLoading: boolean;
  error: string | null;
  createPrompt: (content: string) => Promise<void>;
}

export const useSearchStore = create<PromptState>((set) => ({
  prompt: null,
  isLoading: false,
  error: null,

  createPrompt: async (content) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post<PromptData>('/summary', { content });
      set({ prompt: res.data, isLoading: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      set({ isLoading: false });
    }
  },
}));
