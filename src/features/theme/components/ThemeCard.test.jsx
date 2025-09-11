import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return { ...actual, useAtomValue: vi.fn() };
});

import ThemeCard from "./ThemeCard";
import userEvent from "@testing-library/user-event";

describe("ThemeCard", () => {
  const themeActions = {
    applyTheme: vi.fn(),
    previewTheme: vi.fn(),
    cancelThemeChange: vi.fn(),
  };

  const renderComponent = (isOpened = true) => {
    render(<ThemeCard isOpened={isOpened} themeActions={themeActions} />);
    return {
      applyThemeBtn: screen.queryByRole("button", { name: /apply theme/i }),
      cancelChangeBtn: screen.queryByRole("button", { name: /cancel change/i }),
    };
  };

  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should not render if isOpened is false", () => {
    const { applyThemeBtn, cancelChangeBtn } = renderComponent(false);

    expect(screen.queryByText(/change theme/i)).not.toBeInTheDocument();
    expect(applyThemeBtn).not.toBeInTheDocument();
    expect(cancelChangeBtn).not.toBeInTheDocument();
  });

  it("should show action buttons", () => {
    const { applyThemeBtn, cancelChangeBtn } = renderComponent();

    expect(applyThemeBtn).toBeInTheDocument();
    expect(applyThemeBtn).toHaveTextContent(/apply/i);

    expect(cancelChangeBtn).toBeInTheDocument();
    expect(cancelChangeBtn).toHaveTextContent(/cancel/i);
  });

  it("should render theme buttons and allow preview for selected one", async () => {
    const themes = ["soft", "warm", "modern"];

    renderComponent();

    themeActions.previewTheme.mockReturnValue("warm");

    themes.forEach((theme) => {
      const theme_btn = screen.getByRole("button", {
        name: new RegExp(`preview ${theme} theme`, "i"),
      });
      expect(theme_btn).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("button", { name: /preview warm theme/i })
    );
    expect(themeActions.previewTheme).toHaveBeenCalledWith("warm");
  });

  it("should call apply theme function if apply button clicked", async () => {
    const { applyThemeBtn } = renderComponent();
    await user.click(applyThemeBtn);
    expect(themeActions.applyTheme).toBeCalled();
  });

  it("should close ThemeCard when X button triggered", async () => {
    renderComponent();
    const closeBtn = screen.getByRole("button", { name: /close theme menu/i });
    await user.click(closeBtn);
    expect(themeActions.cancelThemeChange).toBeCalled();
  });

  it("should call cancel theme change function if cancel button clicked", async () => {
    const { cancelChangeBtn } = renderComponent();
    await user.click(cancelChangeBtn);
    expect(themeActions.cancelThemeChange).toBeCalled();
  });
});
