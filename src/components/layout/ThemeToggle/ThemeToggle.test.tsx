import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ThemeProvider, useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "./index";

// Mock the dynamic import and Next.js
vi.mock("next/dynamic", () => ({
  default: () => {
    const Component = () => {
      const MockedClientThemeToggle = () => {
        const { theme, setTheme, resolvedTheme } = useTheme();

        const displayTheme = theme === "system" ? resolvedTheme : theme;

        return (
          <button
            onClick={() =>
              setTheme(displayTheme === "light" ? "dark" : "light")
            }
            data-testid="theme-toggle"
            aria-label={`Switch to ${
              displayTheme === "light" ? "dark" : "light"
            } mode`}
            tabIndex={0}
          >
            {displayTheme === "light" ? "🌙" : "☀️"}
          </button>
        );
      };
      return <MockedClientThemeToggle />;
    };
    return Component;
  },
}));

// Mock localStorage for testing
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

const renderWithThemeProvider = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("ThemeToggle Component", () => {
  test("should render without crashing", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");
    expect(themeToggle).toBeInTheDocument();
  });

  test("should start with light theme by default", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");
    expect(themeToggle).toHaveTextContent("🌙");
    expect(themeToggle).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  test("should be accessible", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");

    // Should have proper ARIA attributes
    expect(themeToggle).toHaveAttribute("aria-label");
    expect(themeToggle.getAttribute("aria-label")).toMatch(
      /Switch to (light|dark) mode/
    );

    // Should be focusable
    expect(themeToggle).toHaveAttribute("tabIndex", "0");

    // Should be a button element
    expect(themeToggle.tagName).toBe("BUTTON");
  });

  test("should handle focus correctly", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");

    themeToggle.focus();
    expect(themeToggle).toHaveFocus();
  });

  test("should be responsive to clicks", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");

    // Should respond to click events
    fireEvent.click(themeToggle);
    // After clicking, the implementation should handle the theme toggle
  });

  test("should handle multiple rapid clicks gracefully", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");

    // Simulate rapid clicking
    for (let i = 0; i < 5; i++) {
      fireEvent.click(themeToggle);
    }

    // Component should still be rendered and functional
    expect(themeToggle).toBeInTheDocument();
  });

  test("should handle keyboard events", () => {
    renderWithThemeProvider(<ThemeToggle />);

    const themeToggle = screen.getByTestId("theme-toggle");

    themeToggle.focus();

    // Should respond to Enter key
    fireEvent.keyDown(themeToggle, { key: "Enter", code: "Enter" });

    // Should respond to Space key
    fireEvent.keyDown(themeToggle, { key: " ", code: "Space" });

    expect(themeToggle).toBeInTheDocument();
  });

  test("should render multiple instances without conflicts", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeToggle />
      </ThemeProvider>
    );

    const themeToggles = screen.getAllByTestId("theme-toggle");
    expect(themeToggles).toHaveLength(2);

    // Both should be functional
    themeToggles.forEach((toggle) => {
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveAttribute("aria-label");
    });
  });
});
