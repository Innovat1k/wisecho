import { useAtom, useAtomValue } from "jotai";
import { curQuote, favQuotes } from "../atoms/atoms";

export const useFavorise = () => {
  const current = useAtomValue(curQuote);
  const [favoritesQ, setFavoritesQ] = useAtom(favQuotes);

  // Add the current quote to the favorites list
  const addFavorite = () => {
    setFavoritesQ((prev) => [...prev, current]);
  };

  // Remove a quote from favorites list
  const removeFavorite = (id) => {
    console.log(id);
    
    const itemsCopy = [...favoritesQ];
    console.log(itemsCopy);
    
    const res = itemsCopy.filter((item) => item !== id);
    console.log(res);
    
  };

  return {addFavorite, removeFavorite};
};
