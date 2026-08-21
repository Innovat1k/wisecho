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

  it("does have modern theme by default", () => {
    const { result } = renderHook(useTheme);
    expect(result.current.theme).toBe("modern");
  });

  it("toggles popover open/close state", () => {
    const { result } = renderHook(useTheme);

    act(() => result.current.togglePopover());
    expect(result.current.isPopoverOpen).toBeTruthy();

    act(() => result.current.togglePopover());
    expect(result.current.isPopoverOpen).toBeFalsy();
  });

  it("sets the clicked theme", () => {
    store.set(themeAtom, "warm");

    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });

    act(() => result.current.selectTheme("modern"));
    expect(result.current.theme).toBe("modern");
  });

  it("does have correct theme class on document body", () => {
    store.set(themeAtom, "modern");

    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });

    expect(document.body.className).toBe("modern");

    act(() => result.current.selectTheme("soft"));
    expect(result.current.theme).toBe("soft");
    expect(document.body.className).toBe("soft");
  });
});
