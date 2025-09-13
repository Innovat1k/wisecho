import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders with correct label", () => {
    render(<Button ariaLabel="validate" label="Validate" />);
    expect(
      screen.getByRole("button", { name: /validate/i })
    ).toBeInTheDocument();
  });

  it("is disabled when label is 'Favorite' and disabled is true", () => {
    render(<Button label="Favorite" disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("remains enabled when 'disabled' prop is not set", () => {
    render(<Button label="Favorite" />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
