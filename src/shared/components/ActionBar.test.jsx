import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { useFavoriteQuote } from "@/features/favorites/hooks/useFavoriteQuote";
import ActionBar from "./ActionBar";

vi.mock("@/features/favorites/hooks/useFavoriteQuote", () => ({
  useFavoriteQuote: vi.fn(),
}));

vi.mock("../utils/utils", async () => {
  const actual = await vi.importActual("../utils/utils");
  return { ...actual, primaryTags: ["peace", "nature", "anger", "society"] };
});

const generateQuote = vi.fn();
const changeTag = vi.fn();

const renderComponent = (isAlreadyFavorite = false, favoriteFunc = vi.fn()) => {
  useFavoriteQuote.mockReturnValue({
    favoriteButton: { isInFav: isAlreadyFavorite, label: "Add to favorites" },
    addFavorite: favoriteFunc,
  });

  render(<ActionBar generateQuote={generateQuote} changeTag={changeTag} />);
};

describe("ActionBar", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders ActionBar with correct elements", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: /add to favorite/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /new quote/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Open theme menu/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Filter quotes/i }),
    ).toBeInTheDocument();

    screen.debug();
  });

  it("calls changeTag() if trigger a select option", async () => {
    renderComponent();

    await userEvent.selectOptions(screen.getByRole("combobox"), "nature");
    expect(changeTag).toHaveBeenCalledOnce();
  });

  it("calls addFavorite() when 'Add to favorite' button is clicked", async () => {
    const mockAddFavorite = vi.fn();
    renderComponent(false, mockAddFavorite);

    await user.click(
      screen.queryByRole("button", {
        name: /add to favorite/i,
      }),
    );
    expect(mockAddFavorite).toHaveBeenCalledOnce();
  });

  it("calls generateQuote() when 'New quote' button is clicked", async () => {
    renderComponent();

    await user.click(screen.getByRole("button", { name: /new quote/i }));
    expect(generateQuote).toHaveBeenCalledOnce();
  });
});
