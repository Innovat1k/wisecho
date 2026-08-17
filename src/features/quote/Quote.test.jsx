import { render, screen, within } from "@testing-library/react";
import Quote from "./Quote";
import { expect } from "vitest";

describe("Quote", () => {
  let fetchStatus = { isLoading: false, hasError: false };

  it("should render initial quote", () => {
    const mockQuote = {
      body: "Choose wise",
      tags: ["society", "faith"],
      author: "random-author",
      id: "123",
    };
    render(<Quote quote={mockQuote} status={fetchStatus} />);

    const blockquote = screen.getByTestId("q-text");
    const quote_author = screen.getByTestId("q-author");
    const quote_tags = within(screen.getByTestId("Quote tags")).getAllByTestId(
      /tag-/i
    );

    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent("Choose wise");
    expect(quote_author).toHaveTextContent("random-author");
    expect(quote_tags).toHaveLength(2);
    quote_tags.forEach((tag, index) => {
      expect(
        screen.getByTestId(new RegExp(`tag-${index}`, "i"))
      ).toHaveTextContent(mockQuote.tags[index]);
    });
  });

  it("should show error message if quote fetch fails", () => {
    fetchStatus.hasError = true;
    render(<Quote quote={{}} status={fetchStatus} />);

    const errorMsg = screen.getByText(/Try again/i);
    expect(errorMsg).toBeInTheDocument();
  });

  it("should show spinner if quote data isn't loaded yet", () => {
    fetchStatus.isLoading = true;
    render(<Quote status={fetchStatus} />);

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
