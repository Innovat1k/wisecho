import { createStore } from "jotai";
import { getLocalStorage } from "../utils/utils";
import {
  favoriteQuotesAtom,
  quoteAtom,
  statisticAtom,
  tagAtom,
  themeAtom,
} from "./atoms";

export const initStore = () => {
  const store = createStore();

  const persisted = getLocalStorage("genQuote", {});

  store.set(quoteAtom, persisted.currentQuote ?? {});
  store.set(favoriteQuotesAtom, persisted.favorite ?? []);
  store.set(
    statisticAtom,
    persisted.statistic ?? { generatedCount: 0, favoritesCount: 0 }
  );
  store.set(themeAtom, persisted.theme ?? "modern");
  store.set(tagAtom, persisted.tag ?? "random");

  return store;
};
