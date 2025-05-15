import { atom } from "jotai";

// Atom for current theme
export const appTheme = atom("modern");

// Atom for current quote
export const currentQuoteAtom = atom({});

// Favorite quotes list
export const favoritesQuotesAtom = atom([]);

// App generation & favorites status : generated starts by 1 with the pre-generated random quote
export const statisticAtom = atom({ generated: 1, favorite: 0 });
