/**
 * Custom hook to manage quote generation and display in the app.
 *
 * Features:
 * - Loads a quote on component mount
 * - Prevents unnecessary refetch if quote is already loaded
 * - Handles user action to generate a new quote (random or filtered)
 * - Updates statistics accordingly
 */

import { useAtom } from "jotai";
import { useQuoteFetcher } from "../../../shared/hooks/useQuoteFetcher";
import { quoteAtom, statisticAtom, tagAtom } from "../../../shared/atoms/atoms";
import { useEffect, useRef } from "react";
import { filterQuote, randomNum } from "../../../shared/utils/utils";

export const useQuoteManager = () => {
  // Global state for current quote
  const [quote, setQuote] = useAtom(quoteAtom);

  // Global state for current quote
  const [statistic, setStatistic] = useAtom(statisticAtom);

  // Fetch logic from dedicated hook
  const { isLoading, setLoading, hasError, fetchQuote } = useQuoteFetcher();

  // Ref to prevent double fetch (especially in React 18 StrictMode)
  const hasFetched = useRef(false);

  // State for current tag selection
  const [tagOption, setTagOption] = useAtom(tagAtom);

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
      const data = await fetchQuote(tagOption);
      if (data) {
        setQuote(data);
        setStatistic((prev) => ({
          ...prev,
          generatedCount: prev.generatedCount + 1,
        }));
      }
    };
    init();
  }, []);

  // Change tag option to filter quote generation
  const changeTag = (e) => {
    setTagOption(e.target.value);
  };

  /**
   * Generates a new quote when triggered by user (button click)
   * @param e - Optional event object (e.g., form submission)
   */
  const generateQuote = async (e) => {
    e.preventDefault();
    const data =
      tagOption === "random" ? await fetchQuote() : await fetchQuote(tagOption);
    if (data) {
      const tempQuote = data.quotes;
      tagOption === "random"
        ? setQuote(data)
        : setQuote(tempQuote[randomNum(tempQuote)]);

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

  return { quote, generateQuote, status: { isLoading, hasError }, changeTag };
};
