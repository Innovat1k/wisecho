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
import { useEffect, useRef } from "react";
import {
  quoteAtom,
  statisticAtom,
  tagAtom,
} from "../../../shared/atoms/atoms";
import { randomNum } from "../../../shared/utils/utils";
import { useQuoteFetcher } from "../../../shared/hooks/useQuoteFetcher/useQuoteFetcher";

export const useQuoteManager = () => {
  // Global state for current quote
  const [quote, setQuote] = useAtom(quoteAtom);

  // Global statistics state
  const [, setStatistic] = useAtom(statisticAtom);

  // Fetch logic from dedicated hook
  const {
    isLoading,
    setLoading,
    hasError,
    fetchQuote,
  } = useQuoteFetcher();

  // Prevent duplicate initial fetch, especially in React StrictMode
  const hasFetched = useRef(false);

  // Global state for current tag selection
  const [tagOption, setTagOption] = useAtom(tagAtom);

  /**
   * Load initial quote.
   * Skips fetching if a quote is already available.
   */
  useEffect(() => {
    if (hasFetched.current) return;

    if (quote?.id) {
      hasFetched.current = true;
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
  }, [
    fetchQuote,
    quote?.id,
    setLoading,
    setQuote,
    setStatistic,
    tagOption,
  ]);

  /**
   * Change tag option used for quote generation.
   */
  const changeTag = (e) => {
    setTagOption(e.target.value);
  };

  /**
   * Generate a new quote when triggered by the user.
   */
  const generateQuote = async (e) => {
    e?.preventDefault();

    const data =
      tagOption === "random"
        ? await fetchQuote()
        : await fetchQuote(tagOption);

    if (data) {
      if (tagOption === "random") {
        setQuote(data);
      } else {
        const tempQuote = data.quotes;
        setQuote(tempQuote[randomNum(tempQuote)]);
      }

      setStatistic((prev) => ({
        ...prev,
        generatedCount: prev.generatedCount + 1,
      }));
    }
  };

  return {
    quote,
    generateQuote,
    status: {
      isLoading,
      hasError,
    },
    changeTag,
  };
};