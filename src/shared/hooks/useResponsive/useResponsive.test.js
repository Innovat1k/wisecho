import { beforeEach, describe, it, expect, vi } from "vitest";
import { useResponsive } from "../useResponsive";
import { renderHook, act } from "@testing-library/react";

describe("useResponsive", () => {
  let listeners = {};
  let mediaQueries = {};

  beforeEach(() => {
    listeners = {};
    mediaQueries = {};

    vi.stubGlobal("matchMedia", (query) => {
      if (!mediaQueries[query]) {
        let matches = false;
        listeners[query] = [];

        mediaQueries[query] = {
          get matches() {
            return matches;
          },
          setMatches(value) {
            matches = value;
            listeners[query].forEach((cb) => cb());
          },
          addEventListener: (event, cb) => listeners[query].push(cb),
          removeEventListener: (event, cb) => {
            listeners[query] = listeners[query].filter((fn) => fn !== cb);
          },
        };
      }
      return mediaQueries[query];
    });
  });

  it("should initialize with all screen flags false and isReady true", () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isReady: true,
    });
  });

  it("should update isMobile to true when mobile media query matches", () => {
    const { result } = renderHook(() => useResponsive());

    const mobileMedia = window.matchMedia("(max-width: 639px)");

    act(() => {
      mobileMedia.setMatches(true);
    });

    expect(result.current.isMobile).toBe(true);
  });

  it("should update isTablet to true when tablet media query matches", () => {
    const { result } = renderHook(() => useResponsive());

    const tabletMedia = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)"
    );

    act(() => {
      tabletMedia.setMatches(true);
    });

    expect(result.current.isTablet).toBe(true);
  });

  it("should update isDesktop to true when desktop media query matches", () => {
    const { result } = renderHook(() => useResponsive());

    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    act(() => {
      desktopMedia.setMatches(true);
    });

    expect(result.current.isDesktop).toBe(true);
  });

  it("should update isMobile to false when mobile media query no longer matches", () => {
    const { result } = renderHook(() => useResponsive());
    const mobileMedia = window.matchMedia("(max-width: 639px)");

    act(() => {
      mobileMedia.setMatches(true);
    });
    expect(result.current.isMobile).toBe(true);

    act(() => {
      mobileMedia.setMatches(false);
    });
    expect(result.current.isMobile).toBe(false);
  });

  it("should remove listeners on unmount", () => {
    const { unmount } = renderHook(() => useResponsive());
    unmount();

    expect(listeners["(max-width: 639px)"].length).toBe(0);
    expect(listeners["(min-width: 640px) and (max-width: 1023px)"].length).toBe(
      0
    );
    expect(listeners["(min-width: 1024px)"].length).toBe(0);
  });
});
