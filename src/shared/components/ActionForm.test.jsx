import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { useFavoriteQuote } from "../../features/favorites/hooks/useFavoriteQuote";
import ActionForm from "./ActionForm";



vi.mock("../../features/favorites/hooks/useFavoriteQuote", () => ({
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

  render(<ActionForm generateQuote={generateQuote} changeTag={changeTag} />);
};

describe("ActionForm", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should renders 'Add to favorite' button with correct label", () => {
    renderComponent();

    const favoriteBtn = screen.queryByRole("button", {
      name: /add to favorite/i,
    });

    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveTextContent(/add|favorite/i);
  });

  it("should renders 'New quote' button with correct label", () => {
    renderComponent();

    const generateBtn = screen.getByRole("button", { name: /new quote/i });

    expect(generateBtn).toBeInTheDocument();
    expect(generateBtn).toHaveTextContent(/new|generate|create/i);
  });

  it("should renders tag selector and triggers changeTag on selection", async () => {
    renderComponent();

    const selectBox = screen.getByRole("combobox");

    expect(selectBox).toBeInTheDocument();

    await userEvent.selectOptions(selectBox, "nature");

    expect(changeTag).toHaveBeenCalledTimes(1);
    expect(changeTag).toHaveBeenCalledWith(expect.anything());
    expect(screen.getByText("nature")).toBeInTheDocument();
    expect(screen.getByText("anger")).toBeInTheDocument();
    expect(screen.getByText("society")).toBeInTheDocument();
  });

  it("should calls addFavorite when 'Add to favorite' button is clicked", async () => {
    const mockAddFavorite = vi.fn();
    renderComponent(false, mockAddFavorite);

    const favoriteBtn = screen.queryByRole("button", {
      name: /add to favorite/i,
    });

    await user.click(favoriteBtn);
    expect(mockAddFavorite).toHaveBeenCalledOnce();
  });

  it("should calls generateQuote when 'New quote' button is clicked", async () => {
    renderComponent();
    const generateBtn = screen.getByRole("button", { name: /new quote/i });
    await user.click(generateBtn);
    expect(generateQuote).toHaveBeenCalledOnce();
  });
});
