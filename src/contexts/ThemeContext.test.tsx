import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";

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

// Mock window.matchMedia
const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

// Test component to access theme context
const TestComponent = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <span data-testid="current-theme">{resolvedTheme}</span>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button data-testid="set-light" onClick={() => setTheme("light")}>
        Set Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme("dark")}>
        Set Dark
      </button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockMatchMedia.mockClear();
  });

  test("should provide default light theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  test("should toggle theme from light to dark", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-theme");
    const themeDisplay = screen.getByTestId("current-theme");

    expect(themeDisplay).toHaveTextContent("light");

    fireEvent.click(toggleButton);

    expect(themeDisplay).toHaveTextContent("dark");
  });
});
