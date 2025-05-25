/**
 * Custom hook to manage app's data persisting on localStorage
 * Features:
 * - Save app's data (theme, quote, favorite and statistic) to prevent data loss after refresh / F5
 * - Clear saved data from loacalStorage
 */

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import {
  quoteAtom,
  favoriteQuotesAtom,
  statisticAtom,
  themeAtom,
} from "../atoms/atoms";

export const usePersistStorage = () => {
  const [quote, setQuote] = useAtom(quoteAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [favorite, setFavorite] = useAtom(favoriteQuotesAtom);
  const [statistic, setStatistic] = useAtom(statisticAtom);

  const lastSerializedRef = useRef();

  useEffect(() => {
    const data = { theme, quote, favorite, statistic };
    const serialized = JSON.stringify(data);

    if (lastSerializedRef.current !== serialized) {
      localStorage.setItem("genQuote", serialized);
      lastSerializedRef.current = serialized;
    }
  }, [theme, quote, favorite, statistic]);

  // Reset saved data
  const resetAppState = () => {
    setTheme("modern");
    setQuote({});
    setFavorite([]);
    setStatistic({ generatedCount: 1, favoritesCount: 0 });

    localStorage.removeItem("genQuote");
  };

  return { resetAppState };
};
