import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MetricsFooter } from "./MetricsFooter";
import userEvent from "@testing-library/user-event";

describe("MetricsFooter", () => {
  it("renders metrics correctly", () => {
    render(<MetricsFooter eyebrowStyle="css" onReset={vi.fn()} />);

    const generatedMetric = within(
      screen.getByTestId("generated-quotes-metric"),
    );

    expect(generatedMetric.getByText(/generated/i)).toBeInTheDocument();
    expect(generatedMetric.getByText("00")).toBeInTheDocument();
  });

  it("calls onReset() if ResetData is clicked", async () => {
    const mockOnReset = vi.fn();

    render(<MetricsFooter eyebrowStyle="css" onReset={mockOnReset} />);

    const resetDataBtn = screen.getByRole("button", {
      name: /reset application data/i,
    });

    expect(resetDataBtn).toBeInTheDocument();

    await userEvent.click(resetDataBtn);

    expect(mockOnReset).toHaveBeenCalledOnce();
  });
});
