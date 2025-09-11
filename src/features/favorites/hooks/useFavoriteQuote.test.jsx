import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import { useFavoriteQuote } from "./useFavoriteQuote";
import { createStore, Provider } from "jotai";
import {
  favoriteQuotesAtom,
  quoteAtom,
  statisticAtom,
} from "../../../shared/atoms/atoms";
import {
  mockFavoriteQuotes,
  mockQuote,
} from "../../../shared/tests/mockQuotes";

describe("useFavoriteQuote", () => {
  let store;
  let Wrapper;

  beforeEach(() => {
    store = createStore();
    Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  });

  it("should add a quote to favorite and update favorite quotes number", () => {
    const mockStatistic = { generatedCount: 0, favoritesCount: 6 };

    store.set(quoteAtom, mockQuote);
    store.set(statisticAtom, mockStatistic);

    const { result } = renderHook(() => useFavoriteQuote(), {
      wrapper: Wrapper,
    });

    act(() => result.current.addFavorite());

    expect(result.current.favQuotes[0]).toEqual(mockQuote);
    expect(result.current.favQuotes).toHaveLength(1);
    expect(store.get(statisticAtom).favoritesCount).toBe(7);
  });

  it('should not add the current quote if it"s already favorite', () => {
    const mockStatistic = { generatedCount: 0, favoritesCount: 2 };

    store.set(quoteAtom, {
      body: "Happiness depends upon ourselves.",
      tags: ["bonheur", "philosophie"],
      id: "F172",
    });
    store.set(favoriteQuotesAtom, mockFavoriteQuotes);
    store.set(statisticAtom, mockStatistic);

    const { result } = renderHook(() => useFavoriteQuote(), {
      wrapper: Wrapper,
    });

    act(() => result.current.addFavorite());

    expect(result.current.favQuotes).toHaveLength(2);
    expect(store.get(statisticAtom).favoritesCount).toBe(2);
  });

  it("should remove a quote from favorite quote list", () => {
    const quoteToRemove = {
      body: "Happiness depends upon ourselves.",
      tags: ["bonheur", "philosophie"],
      id: "F172",
    };

    const mockStatistic = { generatedCount: 0, favoritesCount: 2 };

    store.set(favoriteQuotesAtom, mockFavoriteQuotes);
    store.set(statisticAtom, mockStatistic);

    const { result } = renderHook(() => useFavoriteQuote(), {
      wrapper: Wrapper,
    });

    act(() => result.current.removeFavorite(quoteToRemove));

    expect(result.current.favQuotes).not.toContain(quoteToRemove);
    expect(result.current.favQuotes).toHaveLength(1);
    expect(store.get(statisticAtom).favoritesCount).toBe(1);
  });
});
