import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect } from "vitest";
import App from "../App";
import { useResponsive } from "../shared/hooks/useResponsive";
import { createStore, Provider } from "jotai";
import { themeAtom } from "../atoms/atoms";

vi.mock("../shared/hooks/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

let user;
let Wrapper;
let store;

beforeEach(() => {
  useResponsive.mockReturnValue({ isReady: true, isMobile: true });
  user = userEvent.setup();
  store = createStore();
  Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
});

describe("App", () => {
  describe("Theme", () => {
    it("opens the theme popover when theme button is clicked", async () => {
      render(<App />);

      await user.click(
        screen.getByRole("button", { name: /open theme menu/i }),
      );

      expect(screen.getByText(/theme/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /modern/i }),
      ).toBeInTheDocument();
    });

    it("closes the theme popover if click is outside the popover", async () => {
      render(<App />);

      await user.click(
        screen.getByRole("button", {
          name: /open theme menu/i,
        }),
      );

      expect(
        screen.getByRole("button", { name: /modern/i }),
      ).toBeInTheDocument();

      await user.click(screen.queryByTestId("popoover-overlay"));

      await waitFor(() => {
        expect(screen.queryByText(/theme/i)).not.toBeInTheDocument();
      });
    });

    it("changes the theme if palet button is clicked", async () => {
      store.set(themeAtom, "modern");
      render(<App />, { wrapper: Wrapper });

      await user.click(
        screen.getByRole("button", { name: /open theme menu/i }),
      );

      expect(screen.getByText(/theme/i)).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: /select soft theme/i }),
      );

      expect(document.body.className).toBe("soft");
    });
  });
});
