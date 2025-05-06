import { atom } from "jotai";

// Atom for current theme
export const appTheme = atom("modern");

// Atom for current quote
export const curQuote = atom({});

// Favorite quotes list
export const favQuotes = atom([]);

// App generation & favorites status
export const statistic = atom({ generated: 0, saved: 0 });
