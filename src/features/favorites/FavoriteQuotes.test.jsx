import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import FavoriteQuotes from "./FavoriteQuotes";
import { useFavoriteQuote } from "./hooks/useFavoriteQuote";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { mockFavorites } from "@/__tests__/mockQuotes";

vi.mock("./hooks/useFavoriteQuote", () => ({
  useFavoriteQuote: vi.fn(),
}));

vi.mock("@/shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

const getRemoveLabel = (quote) =>
  `Remove quote: "${quote.body.slice(0, 25)}..." by ${quote.author || "Unknown"}`;

describe("FavoriteQuotes", () => {
  beforeEach(() => {
    useFavoriteQuote.mockReturnValue({
      favQuotes: mockFavorites,
      removeFavorite: vi.fn(),
    });

    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isReady: true,
    });
  });

  it("shows an empty state when there are no favorites", () => {
    useFavoriteQuote.mockReturnValue({
      favQuotes: [],
      removeFavorite: vi.fn(),
    });

    render(<FavoriteQuotes eyebrowStyle="css" />);

    expect(
      screen.getByText(
        /your favorites list is still waiting for its first quote/i,
      ),
    ).toBeInTheDocument();

    expect(screen.queryByTestId("favorites-metric")).not.toBeInTheDocument();
  });

  it("renders the favorite quotes and count", () => {
    render(<FavoriteQuotes eyebrowStyle="css" />);

    expect(
      screen.getByRole("heading", { name: /favorites/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("favorites-metric")).toHaveTextContent(
      String(mockFavorites.length),
    );

    mockFavorites.forEach((quote) => {
      expect(screen.getByText(`“${quote.body}”`)).toBeInTheDocument();
    });
  });

  it("removes a favorite quote on desktop", async () => {
    const user = userEvent.setup();
    const removeFavorite = vi.fn();

    useFavoriteQuote.mockReturnValue({
      favQuotes: mockFavorites,
      removeFavorite,
    });

    render(<FavoriteQuotes eyebrowStyle="css" />);

    const quote = mockFavorites[0];

    await user.click(
      screen.getByRole("button", {
        name: getRemoveLabel(quote),
      }),
    );

    expect(removeFavorite).toHaveBeenCalledWith(quote);
  });

  describe("mobile", () => {
    beforeEach(() => {
      useResponsive.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isReady: true,
      });
    });

    it("hides delete button until a quote is expanded", () => {
      render(<FavoriteQuotes eyebrowStyle="css" />);

      expect(
        screen.queryByRole("button", { name: /remove quote/i }),
      ).not.toBeInTheDocument();
    });

    it("expands a quote and shows its actions", async () => {
      const user = userEvent.setup();

      render(<FavoriteQuotes eyebrowStyle="css" />);

      const quote = mockFavorites[0];

      await user.click(screen.getByText(`“${quote.body}”`));

      expect(
        screen.getByText(`— ${quote.author || "Unknown"}`),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: getRemoveLabel(quote),
        }),
      ).toBeInTheDocument();
    });

    it("removes an expanded quote", async () => {
      const user = userEvent.setup();
      const removeFavorite = vi.fn();

      useFavoriteQuote.mockReturnValue({
        favQuotes: mockFavorites,
        removeFavorite,
      });

      render(<FavoriteQuotes eyebrowStyle="css" />);

      const quote = mockFavorites[0];

      await user.click(screen.getByText(`“${quote.body}”`));

      await user.click(
        screen.getByRole("button", {
          name: getRemoveLabel(quote),
        }),
      );

      expect(removeFavorite).toHaveBeenCalledWith(quote);
    });
  });
});
