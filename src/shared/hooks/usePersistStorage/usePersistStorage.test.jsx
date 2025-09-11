import { createStore, Provider } from "jotai";
import { describe } from "vitest";
import {
  favoriteQuotesAtom,
  statisticAtom,
  themeAtom,
} from "../../atoms/atoms";
import { act, renderHook } from "@testing-library/react";
import { usePersistStorage } from "../usePersistStorage";

describe("usePersistStorage", () => {
  it("should persist data in localStorage on change", () => {
    const store = createStore();

    const atomWrap = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const setItemSpy = vi.spyOn(window.localStorage.__proto__, "setItem");

    const { rerender } = renderHook(() => usePersistStorage(), {
      wrapper: atomWrap,
    });

    act(() => {
      store.set(themeAtom, "retro");
    });

    rerender();

    expect(setItemSpy).toHaveBeenCalledWith(
      "genQuote",
      expect.stringContaining('"theme":"retro"')
    );

    setItemSpy.mockRestore();
  });

  it("should reset all saved data", () => {
    const mockTheme = "warm";
    const mockStatistic = { generatedCount: 5, favoritesCount: 2 };
    const removeItemSpy = vi.spyOn(
      window.localStorage.__proto__,
      "removeItem"
    );

    const mockFavQuotes = [
      {
        body: "Less is more.",
        id: "#382",
        tags: ["minimalism", "design"],
      },
      {
        body: "Stay curious.",
        id: "#719",
        tags: ["mindset", "learning"],
      },
    ];

    const store = createStore();
    store.set(themeAtom, mockTheme);
    store.set(favoriteQuotesAtom, mockFavQuotes);
    store.set(statisticAtom, mockStatistic);

    const atomWrap = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => usePersistStorage(), {
      wrapper: atomWrap,
    });

    act(() => result.current.resetAppState());

    expect(store.get(themeAtom)).toBe("modern");
    expect(store.get(favoriteQuotesAtom).length).toBe(0);
    expect(store.get(favoriteQuotesAtom)).not.toEqual(mockFavQuotes);
    expect(store.get(statisticAtom)).toEqual({
      generatedCount: 0,
      favoritesCount: 0,
    });
    expect(removeItemSpy).toHaveBeenCalledWith("genQuote");

    removeItemSpy.mockRestore();
  });
});
