import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";

vi.mock("../../hooks/useResponsive/useResponsive", () => ({ useResponsive: vi.fn() }));
vi.mock("../../hooks/useShowDetails/useShowDetails", () => ({ useShowDetails: vi.fn() }));

import AppLayout from "./AppLayout";
import { useResponsive } from "../../hooks/useResponsive/useResponsive";
import { useShowDetails } from "../../hooks/useShowDetails/useShowDetails";

const renderComponent = ({
  isReady = false,
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

  render(<AppLayout toggleThemeCard={toggleThemeCard} />);

  const appTitle = screen.queryByRole("heading", { level: 1 });
  const appDetailsTitle = screen.queryByText(/app details/i);

  return { appTitle, appDetailsTitle };
};

describe("AppLayout", () => {
  it("should renders loader spinner while screen type is not ready", () => {
    renderComponent({ isMobile: true, isReady: false });

    const loaderComponent = screen.queryByTestId("spinner");
    expect(loaderComponent).toBeInTheDocument();
  });

  it("should hides MainCard and shows AppDetails when details are open on mobile", () => {
    const { appTitle } = renderComponent({
      isReady: true,
      isMobile: true,
      showDetails: false,
    });

    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toHaveTextContent("Wisecho");
  });

  it("should hide MainCard and show AppDetails if it's opened on mobile", () => {
    const { appTitle, appDetailsTitle } = renderComponent({
      isReady: true,
      isMobile: true,
      showDetails: true,
    });

    expect(appTitle).not.toBeInTheDocument();
    expect(appDetailsTitle).toBeInTheDocument();
  });

  it("should show by default MainCard and AppDetails side by side on tablet and desktop screens", () => {
    const { appTitle, appDetailsTitle } = renderComponent({
      isReady: true,
      isDesktop: true,
      showDetails: true,
    });

    expect(appTitle).toBeInTheDocument();
    expect(appDetailsTitle).toBeInTheDocument();
  });

  it("should hide open and close details buttons on tablet and desktop screens", () => {
    renderComponent({ isReady: true, isTablet: true, showDetails: true });

    const openDetails_btn = screen.queryByRole("button", {
      name: /open details/i,
    });
    const closeDetails_btn = screen.queryByRole("button", {
      name: /close details/i,
    });

    expect(openDetails_btn).not.toBeInTheDocument();
    expect(closeDetails_btn).not.toBeInTheDocument();
  });
});
