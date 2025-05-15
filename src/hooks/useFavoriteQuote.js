import { useAtom, useAtomValue } from "jotai";
import {
  currentQuoteAtom,
  favoritesQuotesAtom,
  statisticAtom,
} from "../atoms/atoms";
import { useEffect, useState } from "react";

export const useFavoriteQuote = () => {
  const current = useAtomValue(currentQuoteAtom);
  const [favQuotes, setFavQuotes] = useAtom(favoritesQuotesAtom);
  const [statistic, setStatistic] = useAtom(statisticAtom);
  const [favoriteButton, setFavoriteButton] = useState({
    isInFav: false,
    label: "Add to favorite",
  });

  // Check if the current quote is already in the favorites list
  const isAlreadyFavorite = () =>
    favQuotes.some((item) => item.id === current?.id);

  // Add the current quote to favorite
  const addFavorite = () => {
    if (isAlreadyFavorite()) return;
    setFavQuotes((prev) => [...prev, current]);
    setStatistic((prev) => ({ ...prev, favorite: prev.favorite + 1 }));
  };

  // Update the button state (label + status) when favorites or current quote change
  useEffect(() => {
    if (!current) return;
    setFavoriteButton(
      isAlreadyFavorite()
        ? { isInFav: true, label: "Favorite" }
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
    setStatistic((prev) => ({ ...prev, favorite: prev.favorite - 1 }));
  };

  return { favQuotes, addFavorite, removeFavorite, favoriteButton };
};
