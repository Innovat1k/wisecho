import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import App from "../App";
import { useResponsive } from "../shared/hooks/useResponsive";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { createStore } from "jotai";
import { favoriteQuotesAtom, quoteAtom, statisticAtom } from "../atoms/atoms";
import { mockQuote, mockQuote2 } from "./mockQuotes";

vi.mock("../shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

describe("App", () => {
  describe("Favorite", () => {
    let user;
    let store;
    let Wrapper;

    beforeEach(() => {
      useResponsive.mockReturnValue({ isReady: true, isTablet: true });
      user = userEvent.setup();
      store = createStore();
      Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    });

    it("should adds a quote to favorites and displays it in the FavoriteQuotes component", async () => {
      store.set(favoriteQuotesAtom, []);
      store.set(quoteAtom, mockQuote);

      render(<App />, { wrapper: Wrapper });

      const favorite_section = screen.getByTestId("Favorite quotes");

      expect(favorite_section).not.toHaveTextContent(/the middle/i);

      await user.click(
        screen.getByRole("button", { name: /add to favorite/i }),
      );

      await waitFor(() => {
        expect(screen.getByTestId("Favorite quotes")).toHaveTextContent(
          /the middle of every difficulty/i,
        );
      });
    });

    it("should removes a quote from favorites and updates the favorites counter", async () => {
      const mockStatistic = { generatedCount: 2, favoritesCount: 1 };

      store.set(favoriteQuotesAtom, [mockQuote2]);
      store.set(quoteAtom, mockQuote);
      store.set(statisticAtom, mockStatistic);

      render(<App />, { wrapper: Wrapper });

      await user.click(
        screen.getByRole("button", { name: /add to favorite/i }),
      );

      await within(screen.getByTestId("Favorite quotes")).findByText(
        /the middle of every difficulty/i,
      );

      expect(screen.getByTestId(/favorites count/i)).toHaveTextContent("02");

      await user.click(
        screen.getByRole("button", { name: /remove quote 104/i }),
      );

      const quote = screen.queryByTestId("favorite-quote-104");
      if (quote) {
        await waitForElementToBeRemoved(() => quote);
      }

      expect(screen.queryByTestId("favorite-quote-104")).toBeNull();
      expect(screen.getByTestId(/favorites count/i)).toHaveTextContent("01");
    });

    it("should displays the empty list message when the last favorite quote is deleted", async () => {
      store.set(quoteAtom, mockQuote);

      render(<App />, { wrapper: Wrapper });

      await user.click(
        screen.getByRole("button", { name: /add to favorite/i }),
      );

      await user.click(
        screen.getByRole("button", { name: /remove quote 104/i }),
      );

      expect(screen.getByTestId(/favorites count/i)).toHaveTextContent("00");

      expect(
        screen.getByText(
          /your favorites list is still waiting for its first quote/i,
        ),
      ).toBeVisible();
    });
  });
});
