import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import ClientFormExample from "./ClientFormExample";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("FormExample Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  test("should render the form", () => {
    render(<ClientFormExample />);

    expect(
      screen.getByText("Step 1: Personal Information")
    ).toBeInTheDocument();
  });

  test("should start on step 1", () => {
    render(<ClientFormExample />);

    expect(
      screen.getByText("Step 1: Personal Information")
    ).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("should validate required fields on step 1", async () => {
    render(<ClientFormExample />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  test("should advance to step 2 with valid data", async () => {
    render(<ClientFormExample />);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0]; // First textbox should be name
    const emailInput = inputs[1]; // Second textbox should be email
    const nextButton = screen.getByText("Next");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText("Step 2: Address Information")
      ).toBeInTheDocument();
      expect(screen.getByText("City")).toBeInTheDocument();
    });
  });

  test("should go back from step 2 to step 1", async () => {
    render(<ClientFormExample />);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0];
    const emailInput = inputs[1];

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(
        screen.getByText("Step 2: Address Information")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Previous"));

    await waitFor(() => {
      expect(
        screen.getByText("Step 1: Personal Information")
      ).toBeInTheDocument();
    });
  });

  test("should advance to step 3 from step 2", async () => {
    render(<ClientFormExample />);

    // Navigate to step 2
    const inputs1 = screen.getAllByRole("textbox");
    const nameInput = inputs1[0];
    const emailInput = inputs1[1];

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(
        screen.getByText("Step 2: Address Information")
      ).toBeInTheDocument();
    });

    // Fill step 2 and advance to step 3
    const inputs2 = screen.getAllByRole("textbox");
    const addressInput = inputs2[0];
    const cityInput = inputs2[1];

    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Step 3: Preferences")).toBeInTheDocument();
      expect(
        screen.getByText("Interests (select multiple)")
      ).toBeInTheDocument();
    });
  });

  test("should submit the form from step 3", async () => {
    render(<ClientFormExample />);

    // Navigate through all steps
    const inputs1 = screen.getAllByRole("textbox");
    const nameInput = inputs1[0];
    const emailInput = inputs1[1];

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(
        screen.getByText("Step 2: Address Information")
      ).toBeInTheDocument();
    });

    const inputs2 = screen.getAllByRole("textbox");
    const addressInput = inputs2[0];
    const cityInput = inputs2[1];

    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(cityInput, { target: { value: "New York" } });
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Step 3: Preferences")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Form Submitted!")).toBeInTheDocument();
    });
  });

  test("should reset the form when reset button is clicked", async () => {
    render(<ClientFormExample />);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0];
    const emailInput = inputs[1];

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");

    fireEvent.click(screen.getByText("Reset"));

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  test("should persist data to localStorage", async () => {
    render(<ClientFormExample />);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0];
    const emailInput = inputs[1];

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    // Check if localStorage was called
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  test("should handle validation errors correctly", async () => {
    render(<ClientFormExample />);

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0];
    const emailInput = inputs[1];

    // Enter invalid email
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });
});
