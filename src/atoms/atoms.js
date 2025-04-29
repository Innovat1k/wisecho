import { atom } from "jotai";

export const appTheme = atom("modern");

export const curQuote = atom({});

export const favQuotes = atom([]);

export const statistic = atom({ generated: 0, saved: 0 });
