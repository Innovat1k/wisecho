import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import FavoriteQuotes from "./FavoriteQuotes";
import { useFavoriteQuote } from "./hooks/useFavoriteQuote";
import userEvent from "@testing-library/user-event";
import { mockFavorites } from "../../__tests__/mockQuotes";

vi.mock("./hooks/useFavoriteQuote", () => ({
  useFavoriteQuote: vi.fn(),
}));

describe("FavoriteQuotes", () => {
  beforeEach(() => {
    useFavoriteQuote.mockReturnValue({
      favQuotes: mockFavorites,
      removeFavorite: vi.fn(),
    });
  });

  it("should show a fallback message if favorite list is empty", () => {
    useFavoriteQuote.mockReturnValue({
      favQuotes: [],
    });

    render(<FavoriteQuotes />);

    const fallbackMessage = screen.queryByRole("alert");

    expect(fallbackMessage).toBeInTheDocument();
    expect(fallbackMessage).toHaveTextContent(
      /your favorites list is still waiting for its first quote/i
    );
  });

  it("should show correct favorite quote list", () => {
    render(<FavoriteQuotes />);

    const favorite_section_title = screen.getByRole("heading", { level: 3 });
    const favoriteQuoteList = screen.getAllByTestId(/favorite-quote/i);

    expect(favorite_section_title).toBeInTheDocument();
    expect(favorite_section_title).toHaveTextContent(/favorites/i);
    expect(favoriteQuoteList).toHaveLength(3);
    expect(
      screen.queryByText(
        "Success is not final, failure is not fatal: It is the courage to continue that counts."
      )
    ).toBeVisible();
  });

  it("should call remove quote function when remove button clicked", async () => {
    const mockRemoveFavorite = vi.fn();

    useFavoriteQuote.mockReturnValue({
      favQuotes: mockFavorites,
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavoriteQuotes />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /remove quote 302/i }));
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockFavorites[1]);
  });
});
