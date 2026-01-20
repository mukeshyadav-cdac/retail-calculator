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

  it("calculates and displays subtotal correctly", () => {
    render(<RetailCalculator />);

    const quantityInput = screen.getByLabelText("How many items");
    const priceInput = screen.getByLabelText("Price per item");

    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.change(priceInput, { target: { value: "10" } });

    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("renders region selector and updates value on change", () => {
    render(<RetailCalculator />);

    const select = screen.getByLabelText("Region code");
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "AUK" } });
    expect(screen.getByText("AUK")).toBeInTheDocument();
  });

  it("applies 3% discount for orders $1000+", () => {
    render(<RetailCalculator />);

    const quantityInput = screen.getByLabelText("How many items");
    const priceInput = screen.getByLabelText("Price per item");

    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.change(priceInput, { target: { value: "100" } });

    expect(screen.getByText("Discount (3%)")).toBeInTheDocument();
    expect(screen.getByText("-$30.00")).toBeInTheDocument();
    expect(screen.getByText("$970.00")).toBeInTheDocument();
  });
});
