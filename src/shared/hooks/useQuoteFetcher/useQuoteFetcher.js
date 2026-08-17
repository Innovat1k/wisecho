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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(
    async (filter = "inspiration", type = "tag") => {
      setLoading(true);
      setError(null);

      try {
        const isRandom = filter === "random";
        const url = isRandom ? API_URL : API_FILTERED;

        const queryParams = isRandom
          ? ""
          : `?filter=${encodeURIComponent(filter)}&type=${encodeURIComponent(
              type,
            )}`;

        const response = await fetch(`${url}${queryParams}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setQuotesData(data);

        return data;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    quotesData,
    isLoading: loading,
    hasError: error,
    fetchQuote,
  };
};
