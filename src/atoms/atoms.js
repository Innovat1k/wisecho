import { atom } from "jotai";
import { getLocalStorage } from "../shared/utils/utils";

// Load persisted data
const persistedData = getLocalStorage("genQuote", {});

// Atom for current theme
export const themeAtom = atom("modern");

// Atom for current quote
export const quoteAtom = atom({});

// Favorite quotes list
export const favoriteQuotesAtom = atom([]);

// App generation & favorites status : generated starts by 1 with the pre-generated random quote
export const statisticAtom = atom({ generatedCount: 0, favoritesCount: 0 });

// Atom for selected tag for fetching
export const tagAtom = atom("random");
