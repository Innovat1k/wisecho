import { render, screen, within } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import MetricsPanel from "./MetricsPanel";
import userEvent from "@testing-library/user-event";
import { usePersistStorage } from "../hooks/usePersistStorage";

vi.mock("../hooks/usePersistStorage", () => ({
  usePersistStorage: vi.fn(),
}));

const mockClosePanel = vi.fn();

const renderComponent = () => {
  usePersistStorage.mockReturnValue({ resetAppState: vi.fn() });
  render(<MetricsPanel closePanel={mockClosePanel} isOnMobile={true} />);
};

describe("MetricsPanel", () => {
  it("renders all element correctly", () => {
    renderComponent();

    expect(
      screen.queryByRole("heading", { name: /analytics & favorites/i }),
    ).toBeInTheDocument();

    const generatedMetric = within(
      screen.getByTestId("generated-quotes-metric"),
    );

    expect(generatedMetric.getByText(/generated/i)).toBeInTheDocument();
    expect(generatedMetric.getByText("00")).toBeInTheDocument();
  });

  it("calls closePanel() if ResetData is clicked", async () => {
    renderComponent();

    await userEvent.click(
      screen.getByRole("button", { name: /close metrics panel/i }),
    );

    expect(mockClosePanel).toHaveBeenCalledOnce();
  });
});
