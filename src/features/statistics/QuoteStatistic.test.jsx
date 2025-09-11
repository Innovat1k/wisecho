import { render, screen, within } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import QuoteStatistic from "./QuoteStatistic";
import { useAtomValue } from "jotai";
import { formatNumber } from "../../shared/utils/utils";

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...actual,
    useAtomValue: vi.fn(),
  };
});

vi.mock("../../shared/utils/utils", async () => {
  const actual = await vi.importActual("../../shared/utils/utils");
  return {
    ...actual,
    formatNumber: vi.fn(),
  };
});

describe("QuoteStatistic", () => {
  it("should render correctly the statistics component", () => {
    useAtomValue.mockReturnValue({
      generatedCount: 13,
      favoritesCount: 5,
    });

    formatNumber.mockImplementation((n) => (n < 10 ? `0${n}` : `${n}`));

    render(<QuoteStatistic />);

    const statisticBlocks = screen.getAllByRole("heading");
    expect(statisticBlocks).toHaveLength(2);

    const titles = [/generated/i, /favorite/i];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const generatedCount = within(
      screen.getByTestId(/generated count/i)
    ).getByText("13");

    const favoritesCount = within(
      screen.getByTestId(/favorites count/i)
    ).getByText("05");

    expect(generatedCount).toBeInTheDocument();
    expect(favoritesCount).toBeInTheDocument();
  });
});
