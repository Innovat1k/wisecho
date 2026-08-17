import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStore, Provider } from "jotai";
import { useQuoteManager } from "./useQuoteManager";
import { quoteAtom, statisticAtom, tagAtom } from "../../../shared/atoms/atoms";
import { useQuoteFetcher } from "../../../shared/hooks/useQuoteFetcher/useQuoteFetcher";
import {
  mockLifeQuotes,
  mockQuote,
} from "../../../shared/__tests__/mockQuotes";

vi.mock("../../../shared/hooks/useQuoteFetcher/useQuoteFetcher", () => ({
  useQuoteFetcher: vi.fn(),
}));

const mockUseQuoteFetcher = (mockData) => {
  const fetchQuote = vi.fn().mockResolvedValue(mockData);

  useQuoteFetcher.mockReturnValue({
    fetchQuote,
    isLoading: false,
    hasError: null,
  });

  return fetchQuote;
};

describe("useQuoteManager", () => {
  let store;
  let Wrapper;

  beforeEach(() => {
    vi.clearAllMocks();

    store = createStore();

    Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
  });

  it("should allow quote tag changing before generation", () => {
    mockUseQuoteFetcher(mockQuote);

    store.set(tagAtom, "random");

    const { result } = renderHook(() => useQuoteManager(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.changeTag({
        target: { value: "peace" },
      });
    });

    expect(store.get(tagAtom)).toBe("peace");
  });

  it("should generate a new random quote", async () => {
    const fetchQuote = mockUseQuoteFetcher(mockQuote);

    const mockStatistic = {
      generatedCount: 0,
      favoritesCount: 0,
    };

    store.set(tagAtom, "random");
    store.set(statisticAtom, mockStatistic);
    store.set(quoteAtom, {
      body: "Be kind.",
      id: "#003",
      tags: ["kindness", "life"],
    });

    const { result } = renderHook(() => useQuoteManager(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await result.current.generateQuote();
    });

    expect(fetchQuote).toHaveBeenCalledWith("random");
    expect(result.current.quote).toEqual(mockQuote);
    expect(store.get(statisticAtom).generatedCount).toBe(1);
  });

  it("should generate a quote with the selected tag", async () => {
    const fetchQuote = mockUseQuoteFetcher(mockLifeQuotes);

    const mockStatistic = {
      generatedCount: 1,
      favoritesCount: 0,
    };

    store.set(quoteAtom, mockQuote);
    store.set(tagAtom, "growth");
    store.set(statisticAtom, mockStatistic);

    const { result } = renderHook(() => useQuoteManager(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await result.current.generateQuote();
    });

    expect(fetchQuote).toHaveBeenCalledWith("growth");
    expect(result.current.quote.tags).toContain("life");
    expect(store.get(statisticAtom).generatedCount).toBe(2);
  });
});