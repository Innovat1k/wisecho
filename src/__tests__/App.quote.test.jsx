import { render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { createStore, Provider } from "jotai";
import { quoteAtom, statisticAtom } from "../atoms/atoms";
import { useResponsive } from "../shared/hooks/useResponsive";
import { useQuoteFetcher } from "../shared/hooks/useQuoteFetcher";
import {
  mockFetchedQuote,
  mockInspirationQuotes,
  mockQuote,
} from "./mockQuotes";

vi.mock("../shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

vi.mock("../shared/hooks/useQuoteFetcher", () => ({
  useQuoteFetcher: vi.fn(),
}));

const mockStatistic = { generatedCount: 1, favoritesCount: 0 };

describe("App", () => {
  describe("Quote", () => {
    let user;
    let Wrapper;
    let store;

    beforeEach(() => {
      useResponsive.mockReturnValue({
        isReady: true,
        isTablet: true,
      });

      user = userEvent.setup();
      store = createStore();
      Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    });

    it("should updates the quote with a random one when 'New Quote' is clicked", async () => {
      useQuoteFetcher.mockReturnValue({
        fetchQuote: vi.fn().mockResolvedValue(mockFetchedQuote),
        setLoading: vi.fn(),
      });

      store.set(quoteAtom, mockQuote);
      store.set(statisticAtom, mockStatistic);

      render(<App />, { wrapper: Wrapper });

      await user.click(screen.getByRole("button", { name: /new quote/i }));

      await waitFor(() => {
        expect(
          screen.getByText(
            /the future belongs to those who believe in the beauty of their dreams/i,
          ),
        ).toBeVisible();
        expect(screen.getByTestId(/tag-0/i)).toHaveTextContent("future");
        expect(screen.getByTestId(/tag-1/i)).toHaveTextContent("dreams");
        expect(screen.getByTestId(/generated count/i)).toHaveTextContent("02");
      });
    });

    it("should displays a quote matching the selected tag", async () => {
      useQuoteFetcher.mockReturnValue({
        fetchQuote: vi.fn().mockResolvedValue(mockInspirationQuotes),
        setLoading: vi.fn(),
      });

      store.set(quoteAtom, mockQuote);

      render(<App />, { wrapper: Wrapper });

      const select = screen.getByRole("combobox");

      await user.selectOptions(select, "inspiration");

      expect(select.value).toBe("inspiration");

      await user.click(screen.getByRole("button", { name: /new quote/i }));

      const inspirationTag = within(
        screen.getByTestId(/quote tags/i),
      ).getByText("inspiration");

      expect(inspirationTag).toBeVisible();
    });
  });
});
