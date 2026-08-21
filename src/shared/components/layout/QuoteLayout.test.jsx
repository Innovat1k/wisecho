import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";

vi.mock("@/shared/hooks/useResponsive", () => ({ useResponsive: vi.fn() }));
vi.mock("@/shared/hooks/useShowDetails", () => ({ useShowDetails: vi.fn() }));

import QuoteLayout from "./QuoteLayout";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { useShowDetails } from "@/shared/hooks/useShowDetails";

const renderComponent = ({
  isReady = true,
  isMobile = false,
  isTablet = false,
  isDesktop = false,
  showDetails = false,
  handleShowDetails = vi.fn(),
}) => {
  useResponsive.mockReturnValue({
    isMobile,
    isTablet,
    isDesktop,
    isReady,
  });

  useShowDetails.mockReturnValue({
    showDetails,
    handleShowDetails,
  });

  const toggleThemeCard = vi.fn();

  render(<QuoteLayout toggleThemeCard={toggleThemeCard} />);
};

describe("QuoteLayout", () => {
  describe("Tablet & Desktop", () => {
    it("renders loader while screen type is not ready", () => {
      renderComponent({ isMobile: true, isReady: false });

      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("shows by default QuoteCard and MetricsPanel side by side on tablet and desktop", () => {
      renderComponent({
        isDesktop: true,
        showDetails: true,
      });

      expect(
        screen.getByRole("heading", { name: /wisecho/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /app details/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Mobile", () => {
    it("shows QuoteCard and hides MetricsPanel", () => {
      renderComponent({
        isMobile: true,
      });

      expect(
        screen.getByRole("heading", { name: /wisecho/i }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: /app details/i }),
      ).not.toBeInTheDocument();
    });

    it("hides QuoteCard and show MetricsPanel", () => {
      renderComponent({
        isMobile: true,
        showDetails: true,
      });

      expect(
        screen.queryByRole("heading", { name: /wisecho/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /app details/i }),
      ).toBeInTheDocument();
    });
  });
});
