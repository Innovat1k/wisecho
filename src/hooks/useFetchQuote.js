import { useState } from "react";

// Custom hook to fetch quotes from a JSON file
// and manage loading and error states
export const useFetchQuote = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("/quotes.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuotesData(data.quotes);
      return data.quotes;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { quotesData, loading, error, fetchQuote };
};
