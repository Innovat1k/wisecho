import { useAtom, useAtomValue } from "jotai";
import {
  favoriteQuotesAtom,
  quoteAtom,
  statisticAtom,
} from "../../../shared/atoms/atoms";
import { useEffect, useState } from "react";

export const useFavoriteQuote = () => {
  const current = useAtomValue(quoteAtom);
  const [favQuotes, setFavQuotes] = useAtom(favoriteQuotesAtom);
  const [statistic, setStatistic] = useAtom(statisticAtom);
  const [favoriteButton, setFavoriteButton] = useState({
    isInFav: false,
    label: "Add to favorites",
  });

  // Check if the current quote is already in the favorites list
  const isAlreadyFavorite = () =>
    favQuotes.some((item) => item.id === current?.id);

  // Add the current quote to favorite
  const addFavorite = () => {
    if (isAlreadyFavorite()) return;
    setFavQuotes((prev) => [...prev, current]);
    setStatistic((prev) => ({
      ...prev,
      favoritesCount: prev.favoritesCount + 1,
    }));
  };

  // Update the button state (label + status) when favorites or current quote change
  useEffect(() => {
    if (!current) return;
    setFavoriteButton(
      isAlreadyFavorite()
        ? { isInFav: true, label: "In favorites" }
        : {
            isInFav: false,
            label: "Add to favorite",
          }
    );
  }, [favQuotes, current]);

  // Remove a quote by ID from the favorites list
  const removeFavorite = (quote) => {
    const itemsCopy = [...favQuotes];
    const res = itemsCopy.filter((item) => item.id !== quote?.id);
    setFavQuotes(res);
    setStatistic((prev) => ({
      ...prev,
      favoritesCount: prev.favoritesCount - 1,
    }));
  };

  return { favQuotes, addFavorite, removeFavorite, favoriteButton };
};
