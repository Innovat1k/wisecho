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

  const { isLoading, hasError, fetchQuote } = useQuoteFetcher();

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
      return;
    }

    hasFetched.current = true;

    const init = async () => {
      try {
        const data = await fetchQuote(tagOption);

        if (data) {
          if (tagOption === "random") {
            setQuote(data);
          } else {
            const tempQuote = data.quotes;

            if (tempQuote?.length) {
              setQuote(tempQuote[randomNum(tempQuote)]);
            }
          }

          setStatistic((prev) => ({
            ...prev,
            generatedCount: prev.generatedCount + 1,
          }));
        }
      } catch {
        // L'erreur est déjà exposée par useQuoteFetcher via hasError.
      }
    };

    init();
  }, [fetchQuote, quote?.id, setQuote, setStatistic, tagOption]);

  const changeTag = (e) => {
    setTagOption(e.target.value);
  };

  const generateQuote = async (e) => {
    e?.preventDefault();

    try {
      const data = await fetchQuote(tagOption);

      if (!data) return;

      if (tagOption === "random") {
        setQuote(data);
      } else {
        const tempQuote = data.quotes;

        if (tempQuote?.length) {
          setQuote(tempQuote[randomNum(tempQuote)]);
        }
      }

      setStatistic((prev) => ({
        ...prev,
        generatedCount: prev.generatedCount + 1,
      }));
    } catch {
      // L'erreur est exposée via hasError.
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
