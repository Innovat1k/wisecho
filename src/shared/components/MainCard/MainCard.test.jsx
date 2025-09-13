import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../../../features/quote/hooks/useQuoteManager", () => ({
  useQuoteManager: vi.fn(),
}));

import MainCard from "./MainCard";
import { useQuoteManager } from "../../../features/quote/hooks/useQuoteManager";

describe("MainCard", () => {
  const openDetails = vi.fn();
  const openThemeMenu = vi.fn();

  useQuoteManager.mockReturnValue({
    quote: [],
    generateQuote: vi.fn(),
    status: {},
    changeTag: vi.fn(),
  });

  it("should renders main heading with text 'Wisecho'", () => {
    render(<MainCard />);

    const appTitle = screen.queryByRole("heading", { level: 1 });
    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toHaveTextContent("Wisecho");
  });

  it("should renders 'open details' button on mobile and calls openDetails callback on click", async () => {
    render(<MainCard openDetails={openDetails} isOnMobile={true} />);

    const openDetailsBtn = screen.queryByRole("button", {
      name: /open details/i,
    });

    expect(openDetailsBtn).toBeInTheDocument();

    await userEvent.click(openDetailsBtn);
    expect(openDetails).toHaveBeenCalledOnce();
  });

  it("should renders 'open theme menu' button and calls openThemeMenu callback on click", async () => {
    render(<MainCard openThemeMenu={openThemeMenu} />);

    const themesMenuBtn = screen.queryByRole("button", {
      name: /open theme menu/i,
    });

    expect(themesMenuBtn).toBeInTheDocument();

    await userEvent.click(themesMenuBtn);
    expect(openThemeMenu).toHaveBeenCalledOnce();
  });
});
