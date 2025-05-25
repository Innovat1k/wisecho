/**
 * Custom hook to manage quote generation and display in the app.
 *
 * Features:
 * - Loads a quote on component mount
 * - Prevents unnecessary refetch if quote is already loaded
 * - Handles user action to generate a new quote
 * - Updates statistics accordingly
 */

import { useAtom } from "jotai";
import { useQuoteFetcher } from "./useQuoteFetcher";
import { quoteAtom, statisticAtom } from "../atoms/atoms";
import { useEffect, useRef } from "react";

export const useQuoteManager = () => {
  // Global state for current quote
  const [quote, setQuote] = useAtom(quoteAtom);

  // Global state for current quote
  const [statistic, setStatistic] = useAtom(statisticAtom);

  // Fetch logic from dedicated hook
  const { isLoading, setLoading, hasError, fetchQuote } = useQuoteFetcher();

  // Ref to prevent double fetch (especially in React 18 StrictMode)
  const hasFetched = useRef(false);

  /**
   * Load initial quote on component mount
   * Skips fetch if quote already exists in global state
   */
  useEffect(() => {
    // 🛡️ Prevent double fetch after loading
    if (hasFetched.current) return;

    // Skip fetch if quote with ID is already available
    if (quote?.id) {
      setLoading(false);
      return;
    }

    hasFetched.current = true;

    const init = async () => {
      const data = await fetchQuote();
      if (data) {
        setQuote(data);
      }
    };
    init();
  }, []);

  /**
   * Generates a new quote when triggered by user (button click)
   * @param e - Optional event object (e.g., form submission)
   */
  const generateQuote = async (e) => {
    e.preventDefault();
    const data = await fetchQuote();
    if (data) {
      setQuote(data);
      setStatistic((prev) => ({
        ...prev,
        generatedCount: prev.generatedCount + 1,
      }));
    }
  };

  /**
   *- hasError: error object if fetch fails
   * Returns:
   * - quote: current quote object
   * - generateQuote: function to load a new quote
   * - isLoading: boolean indicating loading state
   */

  return { quote, generateQuote, status: { isLoading, hasError } };
};
