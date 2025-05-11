import { useEffect, useState } from "react";

export const useResponsive = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isReady: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const tabletQuery = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateScreen = () => {
      setScreen({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
        isReady: true,
      });
    };

    // Initial check
    updateScreen();

    // Add listeners
    mobileQuery.addEventListener("change", updateScreen);
    tabletQuery.addEventListener("change", updateScreen);
    desktopQuery.addEventListener("change", updateScreen);

    // Cleanup
    return () => {
      mobileQuery.removeEventListener("change", updateScreen);
      tabletQuery.removeEventListener("change", updateScreen);
      desktopQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  return screen;
};
