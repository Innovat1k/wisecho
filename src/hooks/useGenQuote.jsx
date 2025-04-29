import { useAtom } from "jotai";
import { useFetchQuote } from "./useFetchQuote";
import { curQuote } from "../atoms/atoms";
import { useEffect } from "react";
import { filterQuote } from "../utils/utils";

// Custom hook to generate quote
// and manage the state of the current quote
export const useGenQuote = () => {
  const [quote, setQuote] = useAtom(curQuote);
  const { quotesData, loading, error, fetchQuote } = useFetchQuote();

  // Random quote while app loaded
  useEffect(() => {
    const init = async () => {
      const data = await fetchQuote();
      console.log("fetched");

      if (data) {
        const filtered = filterQuote(data);
        !quote?.text ? setQuote(filtered) : quote;
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
  };

  return { quote, handleNewQuote, status: { loading, error } };
};
