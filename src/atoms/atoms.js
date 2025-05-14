import { atom } from "jotai";

// Atom for current theme
export const appTheme = atom("modern");

// Atom for current quote
export const currentQuoteAtom = atom({});

// Favorite quotes list
export const favoritesQuotesAtom = atom([]);

// App generation & favorites status
export const statistic = atom({ generated: 0, saved: 0 });
