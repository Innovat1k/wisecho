import { act, renderHook } from "@testing-library/react";
import { describe } from "vitest";
import { useShowDetails } from "./useShowDetails";

describe("useShowDetails", () => {
  it("should initially have showDetails as false", () => {
    const { result } = renderHook(() => useShowDetails());
    expect(result.current.showDetails).toBe(false);
  });

  it("should open details when handleShowDetails is called", () => {
    const { result } = renderHook(() => useShowDetails());

    act(() => result.current.handleShowDetails());
    expect(result.current.showDetails).toBe(true);
  });

  it("should close details when handleShowDetails is called twice", () => {
    const { result } = renderHook(() => useShowDetails());

    act(() => result.current.handleShowDetails());
    act(() => result.current.handleShowDetails());
    expect(result.current.showDetails).toBe(false);
  });
});
