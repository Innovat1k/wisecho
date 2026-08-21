import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/features/quote/hooks/useQuoteManager", () => ({
  useQuoteManager: vi.fn(),
}));

import QuoteCard from "./QuoteCard";
import { useQuoteManager } from "@/features/quote/hooks/useQuoteManager";

describe("QuoteCard", () => {
  const openDetails = vi.fn();

  useQuoteManager.mockReturnValue({
    quote: {
      body: "They certainly give very strange names to diseases.",
      author: "Plato",
      tags: ["medical"],
    },
    generateQuote: vi.fn(),
    status: {},
    changeTag: vi.fn(),
  });

  it("renders elements correctly", () => {
    render(<QuoteCard />);

    expect(
      screen.queryByRole("heading", { name: /Wisecho/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/They certainly give very strange names to diseases/i),
    ).toBeInTheDocument();
  });

  it("renders the open metrics panel btn on mobile only", () => {
    render(<QuoteCard isOnMobile={true} />);

    expect(
      screen.queryByRole("heading", { name: /Wisecho/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Open metrics panel/i,
      }),
    ).toBeInTheDocument();
  });

  it("calls openDetails() if clicked", async () => {
    render(<QuoteCard openDetails={openDetails} isOnMobile={true} />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /Open metrics panel/i,
      }),
    );
    expect(openDetails).toHaveBeenCalledOnce();
  });
});
