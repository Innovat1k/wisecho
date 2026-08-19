import { beforeEach, describe, expect } from "vitest";
import { useResponsive } from "../shared/hooks/useResponsive";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

vi.mock("../shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

const renderComponent = () => {
  render(<App />);
  const appTitle = screen.getByRole("heading", { level: 1 });
  return {
    appTitle,
    openDetailsButton: screen.queryByRole("button", { name: /open details/i }),
    closeDetailsButton: screen.queryByRole("button", {
      name: /close details/i,
    }),
  };
};

let user;

beforeEach(() => {
  useResponsive.mockReturnValue({ isReady: true, isMobile: true });
  user = userEvent.setup();
});

describe("App", () => {
  describe("Mobile", () => {
    it("should AppDetails and hides MainCard when 'open details' is clicked", async () => {
      const { appTitle, openDetailsButton } = renderComponent();

      await user.click(openDetailsButton);

      expect(appTitle).not.toBeVisible();
      expect(await screen.findByText(/app details/i)).toBeInTheDocument();
    });

    it("should returns to MainCard when 'close details' is clicked", async () => {
      const { openDetailsButton } = renderComponent();

      await user.click(openDetailsButton);

      await user.click(
        screen.queryByRole("button", {
          name: /close details/i,
        }),
      );
      expect(await screen.findByRole("heading", { level: 1 })).toBeVisible();
    });
  });
});
