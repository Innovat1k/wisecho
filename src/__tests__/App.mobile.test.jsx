import { beforeEach, describe, expect } from "vitest";
import { useResponsive } from "../shared/hooks/useResponsive";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

vi.mock("../shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

describe("App", () => {
  let user;

  beforeEach(() => {
    useResponsive.mockReturnValue({ isReady: true, isMobile: true });
    user = userEvent.setup();
  });

  describe("Mobile", () => {
    it("closes QuoteCard and opens MEtricsPanel if 'open details' is clicked", async () => {
      render(<App />);

      expect(
        screen.getByRole("heading", { name: /Wisecho/i }),
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /open metrics panel/i,
        }),
      );

      await waitFor(() => {
        expect(
          screen.queryByRole("heading", { name: /Wisecho/i }),
        ).not.toBeInTheDocument();
      });

      expect(
        await screen.findByRole("heading", { name: /app details/i }),
      ).toBeInTheDocument();
    });

    it("returns to QuoteCard when 'close details' is clicked", async () => {
      render(<App />);

      await user.click(
        screen.getByRole("button", {
          name: /open metrics panel/i,
        }),
      );

      expect(
        await screen.findByRole("heading", { name: /app details/i }),
      ).toBeInTheDocument();

      await user.click(
        screen.queryByRole("button", {
          name: /close details/i,
        }),
      );

      expect(
        await screen.findByRole("heading", { name: /Wisecho/i }),
      ).toBeInTheDocument();
      expect(screen.queryByText(/app details/i)).not.toBeInTheDocument();
    });
  });
});
