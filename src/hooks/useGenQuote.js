import { useAtom } from "jotai";
import { useFetchQuote } from "./useFetchQuote";
import { currentQuoteAtom, statisticAtom } from "../atoms/atoms";
import { useEffect } from "react";
import { filterQuote } from "../utils/utils";

// Custom hook to generate quote
// and manage the state of the current quote
export const useGenQuote = () => {
  const [quote, setQuote] = useAtom(currentQuoteAtom);
  const [statistic, setStatistic] = useAtom(statisticAtom);
  const { quotesData, loading, error, fetchQuote } = useFetchQuote();

  // Random quote while app loaded
  useEffect(() => {
    const init = async () => {
      const data = await fetchQuote();

      if (data) {
        const filtered = filterQuote(data);
        if (!quote?.text) setQuote(filtered);
      }
    };
    init();
  }, []);

  // Generate quote by button
  const handleNewQuote = (e) => {
    e.preventDefault();
    fetchQuote();
    const data = filterQuote(quotesData);
    setQuote(data);
    setStatistic((prev) => ({ ...prev, generated: prev.generated + 1 }));
  };

  return { quote, handleNewQuote, status: { loading, error } };
};
