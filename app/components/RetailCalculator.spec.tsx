import { render, screen, fireEvent } from "@testing-library/react";
import RetailCalculator from "./RetailCalculator";

describe("RetailCalculator", () => {
  it("renders quantity input and updates value on change", () => {
    render(<RetailCalculator />);

    const input = screen.getByLabelText("How many items");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "5" } });
    expect(screen.getByText("5 items")).toBeInTheDocument();
  });

  it("renders price input and updates value on change", () => {
    render(<RetailCalculator />);

    const input = screen.getByLabelText("Price per item");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "19.99" } });
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });
});
