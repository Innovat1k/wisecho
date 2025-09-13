import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe } from "vitest";
import App from "../App";
import { useResponsive } from "../shared/hooks/useResponsive";
import { createStore, Provider } from "jotai";
import { themeAtom } from "../shared/atoms/atoms";

vi.mock("../shared/hooks/useResponsive", () => ({ useResponsive: vi.fn() }));

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
    it("opens the theme menu when 'Open Theme Menu' is clicked", async () => {
      render(<App />);

      await user.click(
        screen.getByRole("button", { name: /open theme menu/i })
      );

      const theme_menu_title = await screen.findByText("Change theme");

      expect(theme_menu_title).toBeVisible();
      expect(
        await screen.findByText(
          /soft & soothing|warm & natural|modern & professional/i
        )
      ).toBeVisible();
    });

    it("closes the theme menu when 'Close Theme Menu' is clicked", async () => {
      render(<App />);

      const openThemeMenuBtn = screen.getByRole("button", {
        name: /open theme menu/i,
      });
      await user.click(openThemeMenuBtn);

      const closeThemeMenuBtn = screen.getByRole("button", {
        name: /close theme menu/i,
      });

      await user.click(closeThemeMenuBtn);

      await waitFor(() => {
        expect(screen.queryByText(/change theme/i)).not.toBeInTheDocument();
      });
    });

    it("applies the previewed theme when 'Apply Theme' is clicked", async () => {
      store.set(themeAtom, "modern");
      render(<App />, { wrapper: Wrapper });

      await user.click(
        screen.getByRole("button", { name: /open theme menu/i })
      );

      await waitFor(() => {
        expect(screen.getByText(/change theme/i)).toBeVisible();
      });

      await user.click(
        screen.getByRole("button", { name: /preview soft theme/i })
      );

      await user.click(screen.getByRole("button", { name: /apply theme/i }));
      expect(document.body.className).toBe("soft");
    });

    it("reverts to the previous theme when 'Cancel' is clicked", async () => {
      store.set(themeAtom, "modern");
      render(<App />, { wrapper: Wrapper });

      await user.click(
        screen.getByRole("button", { name: /open theme menu/i })
      );

      await user.click(
        screen.getByRole("button", { name: /preview warm theme/i })
      );

      await waitFor(() => {
        expect(screen.getByText(/Warm & Natural/i)).toBeVisible();
        expect(document.body.className).toBe("warm");
      });

      await user.click(screen.getByRole("button", { name: /cancel/i }));

      await waitFor(() => {
        expect(document.body.className).toBe("modern");
      });
    });
  });
});
