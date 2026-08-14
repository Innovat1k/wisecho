import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import App from "../App";
import { useResponsive } from "../shared/hooks/useResponsive/useResponsive";
import { createStore, Provider } from "jotai";
import { quoteAtom, statisticAtom, themeAtom } from "../shared/atoms/atoms";
import userEvent from "@testing-library/user-event";
import { useQuoteFetcher } from "../shared/hooks/useQuoteFetcher/useQuoteFetcher";

vi.mock("../shared/hooks/useResponsive/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

vi.mock("../shared/hooks/useQuoteFetcher/useQuoteFetcher", () => ({
  useQuoteFetcher: vi.fn(),
}));

const mockInitialQuote = {
  body: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  id: 205,
  tags: ["perseverance", "motivation"],
};

const mockNewQuote = {
  body: "The only limit to our realization of tomorrow is our doubts of today.",
  id: 206,
  tags: ["inspiration", "confidence"],
};

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useResponsive.mockReturnValue({ isReady: true, isTablet: true });
    useQuoteFetcher.mockReturnValue({
      fetchQuote: vi.fn().mockResolvedValue(mockNewQuote),
      setLoading: vi.fn(),
    });
  });

  it("should clear data when reset button clicked", async () => {
    const mockStatistic = { generatedCount: 7, favoritesCount: 3 };

    const user = userEvent.setup();

    const store = createStore();
    store.set(themeAtom, "modern");
    store.set(quoteAtom, mockInitialQuote);
    store.set(statisticAtom, mockStatistic);

    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    render(<App />, { wrapper: Wrapper });

    expect(screen.getByTestId("generated count")).toHaveTextContent("07");
    expect(screen.getByTestId("favorites count")).toHaveTextContent("03");

    await user.click(screen.getByRole("button", { name: /clear data/i }));

    await waitFor(() => {
      expect(document.body.className).toBe("modern");
      expect(screen.getByTestId("generated count")).toHaveTextContent("00");
      expect(screen.getByTestId("favorites count")).toHaveTextContent("00");
      expect(
        screen.getByText(
          /your favorites list is still waiting for its first quote/i,
        ),
      ).toBeVisible();
    });
  });
});
