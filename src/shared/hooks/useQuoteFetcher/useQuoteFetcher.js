/**
 * Custom hook to manage quote fetching with distant API.
 *
 * Features:
 * - Fetches random quotes
 * - Fetches filtered quotes
 * - Handles loading and error states
 */

import { useCallback, useState } from "react";

// Base URL for backend environment
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// URL for random quote
const API_URL = `${BASE_URL}/api/quotes/random`;

// URL for a list of quotes
const API_FILTERED = `${BASE_URL}/api/quotes`;

export const useQuoteFetcher = () => {
  const [quotesData, setQuotesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches a random quote or filtered quotes.
   */
  const fetchQuote = useCallback(
    async (filter = "inspiration", type = "tag") => {
      setLoading(true);
      setError(null);

      try {
        const url = filter === "random" ? API_URL : API_FILTERED;

        const response = await fetch(
          `${url}?filter=${encodeURIComponent(filter)}&type=${type}`
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
    },
    []
  );

  return {
    quotesData,
    isLoading: loading,
    hasError: error,
    setLoading,
    fetchQuote,
  };
};