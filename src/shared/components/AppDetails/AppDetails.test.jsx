import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import AppDetails from "./AppDetails";
import userEvent from "@testing-library/user-event";
import { usePersistStorage } from "../../hooks/usePersistStorage/usePersistStorage";

vi.mock("../../hooks/usePersistStorage/usePersistStorage", () => ({
  usePersistStorage: vi.fn(),
}));

const mockCloseDetails = vi.fn();

const renderComponent = () => {
  const mockResetAppState = vi.fn();
  usePersistStorage.mockReturnValue({ resetAppState: mockResetAppState });
  render(<AppDetails closeDetails={mockCloseDetails} isOnMobile={true} />);

  return mockResetAppState;
};

describe("AppDetails", () => {
  it("should render correctly", () => {
    renderComponent();

    const componentTitle = screen.queryByRole("heading", { level: 2 });
    expect(componentTitle).toBeInTheDocument();
    expect(componentTitle).toHaveTextContent("App Details");
  });

  it("should calls 'closeDetails' when close details is clicked", async () => {
    renderComponent();

    const closeDetailsBtn = screen.queryByRole("button", {
      name: /close details/i,
    });
    expect(closeDetailsBtn).toBeInTheDocument();

    await userEvent.click(closeDetailsBtn);
    expect(mockCloseDetails).toHaveBeenCalledOnce();
  });

  it("should calls 'resetAppState' when clear data is clicked", async () => {
    const mockResetAppState = renderComponent();

    waitFor(() => {
      expect(screen.getByRole("button", { name: /clear data/i })).toBeVisible();
    });

    await userEvent.click(screen.getByRole("button", { name: /clear data/i }));
    expect(mockResetAppState).toHaveBeenCalledOnce();
  });
});
