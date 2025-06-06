import { useState } from 'react';
import { generateContent, isGeminiConfigured } from '@/utils/gemini';

export interface UseGeminiReturn {
  generateResponse: (prompt: string) => Promise<void>;
  response: string | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
}

/**
 * Custom hook for interacting with Gemini AI
 */
export function useGemini(): UseGeminiReturn {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (prompt: string) => {
    if (!prompt.trim()) {
      setError('Please provide a valid prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await generateContent(prompt);
      setResponse(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateResponse,
    response,
    loading,
    error,
    isConfigured: isGeminiConfigured(),
  };
}