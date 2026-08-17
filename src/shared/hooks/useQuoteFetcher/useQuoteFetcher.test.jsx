import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useQuoteFetcher } from "../useQuoteFetcher/useQuoteFetcher";

beforeEach(() => {
  global.fetch = vi.fn();
});

const mockFetchSuccess = (data) => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
};

const mockFetchFailure = () => {
  fetch.mockResolvedValueOnce({ ok: false });
};

describe("useQuoteFetcher", () => {
  it("should fetch and return a random quote successfully", async () => {
    const mockQuote = {
      body: "In the middle of every difficulty lies opportunity.",
      id: 104,
      tags: ["optimism", "resilience"],
    };

    mockFetchSuccess(mockQuote);

    const { result } = renderHook(() => useQuoteFetcher());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const data = await result.current.fetchQuote("random");
      expect(data).toEqual(mockQuote);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/quotes/random"),
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBeNull();
    expect(result.current.quotesData).toEqual(mockQuote);
  });

  it("should set error state when fetch response is not ok", async () => {
    mockFetchFailure();

    const { result } = renderHook(() => useQuoteFetcher());

    await act(async () => {
      await expect(result.current.fetchQuote()).rejects.toThrow(
        "Network response was not ok",
      );
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBeInstanceOf(Error);
  });

  it("should catch network error and set hasError with error message", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useQuoteFetcher());

    await act(async () => {
      await expect(result.current.fetchQuote()).rejects.toThrow(
        "Network error",
      );
    });

    expect(result.current.hasError).toBeInstanceOf(Error);
    expect(result.current.hasError.message).toBe("Network error");
    expect(result.current.isLoading).toBe(false);
  });
});