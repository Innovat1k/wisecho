/**
 * Cutom hook to manage quote fetching with distant api
 *
 * Features :
 * - Get api urls from backend
 * - Fetch random quote
 */

import { useAtomValue } from "jotai";
import { useState } from "react";
import { tagAtom } from "../../atoms/atoms";

// Base url for backend environment
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Url for random quote
const API_URL = `${BASE_URL}/api/quotes/random`;

// Url for the quote of the day
const API_QOTD = `${BASE_URL}/api/qotd`;

// Url for a list of quotes
const API_FILTERED = `${BASE_URL}/api/quotes`;

export const useQuoteFetcher = () => {
  const [quotesData, setQuotesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tagOption = useAtomValue(tagAtom);

  // Advanced conditional URL to define which api route to use (random or filtered)
  const ADV_URL = tagOption === "random" ? API_URL : API_FILTERED;

  // Fetch a quote or a list of quote according to selected URL
  const fetchQuote = async (filter = "inspiration", type = "tag") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${ADV_URL}?filter=${encodeURIComponent(filter)}&type=${type}`
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
