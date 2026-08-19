import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import { useTheme } from "./useTheme";
import { createStore, Provider } from "jotai";
import { themeAtom } from "@/atoms/atoms";

describe("useTheme", () => {
  let store;
  let Wrapper;

  beforeEach(() => {
    store = createStore();
    Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  });

  it("should have modern theme by default", () => {
    const { result } = renderHook(useTheme);
    expect(result.current.theme).toBe("modern");
  });

  it("should preview any of the 3 themes", () => {
    const { result } = renderHook(useTheme);

    const themes = ["soft", "warm", "modern"];

    themes.forEach((theme) => {
      act(() => result.current.themeActions.previewTheme(theme));
      expect(result.current.theme).toBe(theme);
    });
  });

  it("should toggle themeCard", () => {
    const { result } = renderHook(useTheme);

    act(() => result.current.toggleThemeCard());
    expect(result.current.isThemeCardOpen).toBeTruthy();

    act(() => result.current.toggleThemeCard());
    expect(result.current.isThemeCardOpen).toBeFalsy();
  });

  it("should allow theme cancelling then close themeCard", () => {
    const fakeEvent = { preventDefault: vi.fn() };

    store.set(themeAtom, "soft");

    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });

    act(() => result.current.toggleThemeCard());
    expect(result.current.isThemeCardOpen).toBeTruthy();

    act(() => result.current.themeActions.previewTheme("warm"));
    expect(result.current.theme).toBe("warm");

    act(() => result.current.themeActions.cancelThemeChange(fakeEvent));
    expect(result.current.theme).toBe("soft");
    expect(result.current.isThemeCardOpen).toBeFalsy();
  });

  it("should apply theme changing", () => {
    const fakeEvent = { preventDefault: vi.fn() };

    store.set(themeAtom, "warm");

    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });

    act(() => result.current.toggleThemeCard());
    expect(result.current.isThemeCardOpen).toBeTruthy();

    act(() => result.current.themeActions.previewTheme("modern"));
    expect(result.current.theme).toBe("modern");

    act(() => result.current.themeActions.applyTheme(fakeEvent));
    expect(result.current.theme).toBe("modern");
    expect(result.current.isThemeCardOpen).toBeFalsy();
  });

  it("should have correct theme class on document body", () => {
    store.set(themeAtom, "modern");

    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });

    expect(document.body.className).toBe("modern");

    act(() => result.current.themeActions.previewTheme("soft"));
    expect(result.current.theme).toBe("soft");
  });
});
