import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ThemePopover from "./ThemePopover";
import userEvent from "@testing-library/user-event";

describe("ThemePopover", () => {
  it("renders popover content correctly", () => {
    render(
      <ThemePopover
        isOpened={true}
        closePopover={vi.fn()}
        selectTheme={vi.fn()}
      />,
    );

    expect(screen.getByText(/theme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select soft theme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select warm theme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select modern theme/i)).toBeInTheDocument();
  });

  it("calls selectTheme() if theme button is clicked", async () => {
    const selectThemeMock = vi.fn();

    render(
      <ThemePopover
        isOpened={true}
        closePopover={vi.fn()}
        selectTheme={selectThemeMock}
      />,
    );

    expect(screen.getByText(/theme/i)).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", { name: /select warm theme/i }),
    );

    expect(selectThemeMock).toHaveBeenCalled();
  });

  it("calls closePopover() if click is done outside the popover", async () => {
    const closePopoverMock = vi.fn();

    render(
      <ThemePopover
        isOpened={true}
        closePopover={closePopoverMock}
        selectTheme={vi.fn()}
      />,
    );

    expect(screen.getByText(/theme/i)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("popover-overlay"));

    expect(closePopoverMock).toHaveBeenCalled();
  });
});
