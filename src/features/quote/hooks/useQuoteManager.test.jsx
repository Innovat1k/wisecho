import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";
import { useQuoteManager } from "./useQuoteManager";
import { createStore, Provider } from "jotai";
import { quoteAtom, statisticAtom, tagAtom } from "../../../shared/atoms/atoms";
import { useQuoteFetcher } from "../../../shared/hooks/useQuoteFetcher";
import { mockLifeQuotes, mockQuote } from "../../../shared/tests/mockQuotes";

vi.mock("../../../shared/hooks/useQuoteFetcher", () => ({
  useQuoteFetcher: vi.fn(),
}));

const mockUseQuoteFetcher = (mockData) => {
  useQuoteFetcher.mockReturnValue({
    fetchQuote: vi.fn().mockResolvedValue(mockData),
    isLoading: false,
    hasError: false,
    setLoading: vi.fn(),
  });
};

describe("useQuoteManager", () => {
  let store;
  let Wrapper;

  beforeEach(() => {
    store = createStore();
    Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  });

  it("should allow quote tag changing  before generation", () => {
    const mockTag = "random";
    mockUseQuoteFetcher(mockQuote);

    store.set(tagAtom, mockTag);

    const { result } = renderHook(() => useQuoteManager(), {
      wrapper: Wrapper,
    });

    act(() => result.current.changeTag({ target: { value: "peace" } }));
    expect(store.get(tagAtom)).toBe("peace");
  });

  it("should generate new random quote", async () => {
    mockUseQuoteFetcher(mockQuote);

    const fakeEvent = { preventDefault: vi.fn() };

    const mockTag = "random";
    const mockStatistic = { generatedCount: 0, favoritesCount: 0 };

    store.set(tagAtom, mockTag);
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
      await result.current.generateQuote(fakeEvent);
    });

    expect(result.current.quote).toEqual(mockQuote);
    await waitFor(() => {
      expect(store.get(statisticAtom).generatedCount).toBe(1);
    });
  });

  it("should generate quote with the selected tag", async () => {
    mockUseQuoteFetcher(mockLifeQuotes);

    const fakeEvent = { preventDefault: vi.fn() };

    const mockTag = "growth";
    const mockStatistic = { generatedCount: 1, favoritesCount: 0 };

    store.set(quoteAtom, mockQuote);
    store.set(tagAtom, mockTag);
    store.set(statisticAtom, mockStatistic);

    const { result } = renderHook(() => useQuoteManager(), {
      wrapper: Wrapper,
    });

    await act(async () => await result.current.generateQuote(fakeEvent));

    expect(result.current.quote.tags).toContain("life");
    expect(store.get(statisticAtom).generatedCount).toEqual(2);
  });
});
