/**
 * Cutom hook to manage quote fetching with distant api
 *
 * Features :
 * - Get api urls from backend
 * - Fetch random quote
 */

import { useState } from "react";

// Base url for backend environment
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BASE_URL}/api/quotes/random`;
const API_QOTD = `${BASE_URL}/api/qotd`;
const API_FILTERED = `${BASE_URL}/api/quotes`;

export const useQuoteFetcher = () => {
  const [quotesData, setQuotesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async (filter = "inspiration", type = "tag") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?filter=${encodeURIComponent(filter)}&type=${type}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setQuotesData(data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    quotesData,
    isLoading: loading,
    hasError: error,
    setLoading,
    fetchQuote,
  };
};
