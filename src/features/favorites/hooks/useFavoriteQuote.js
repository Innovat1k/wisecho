import { useAtom, useAtomValue } from "jotai";
import {
  favoriteQuotesAtom,
  quoteAtom,
  statisticAtom,
} from "../../../atoms/atoms";
import { useCallback, useEffect, useState } from "react";

export const useFavoriteQuote = () => {
  const current = useAtomValue(quoteAtom);
  const [favQuotes, setFavQuotes] = useAtom(favoriteQuotesAtom);
  const [, setStatistic] = useAtom(statisticAtom);
  const [favoriteButton, setFavoriteButton] = useState({
    isInFav: false,
    label: "Add to favorites",
  });

  // Check if the current quote is already in the favorites list
  const isAlreadyFavorite = useCallback(
    () => favQuotes.some((item) => item.id === current?.id),
    [favQuotes, current]
  );

  // Add the current quote to favorite
  const isEmpty = () => {
    return current && Object.keys(current).length === 0;
  };

  const addFavorite = () => {
    if (!current || isEmpty() || isAlreadyFavorite()) {
      return;
    }

    setFavQuotes((prev) => [...prev, current]);
    setStatistic((prev) => ({
      ...prev,
      favoritesCount: prev.favoritesCount + 1,
    }));
    console.log(current);
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
  }, [isAlreadyFavorite, current]);

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
