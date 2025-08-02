import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ActorRefFrom, createActor } from "xstate";
import { themeMachine } from "./themeMachine";

// Mock localStorage for these tests
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

// Mock window object and matchMedia
Object.defineProperty(global, "window", {
  value: {
    localStorage: mockLocalStorage,
    matchMedia: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  },
  writable: true,
});

describe("themeMachine", () => {
  let actor: ActorRefFrom<typeof themeMachine>;

  beforeEach(() => {
    // Reset localStorage mocks
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();

    // Create a new actor for each test
    actor = createActor(themeMachine);
    actor.start();
  });

  afterEach(() => {
    actor.stop();
  });

  describe("Initial State", () => {
    test("should start in light mode by default", () => {
      expect(actor.getSnapshot().value).toBe("light");
    });

    test("should have correct initial context", () => {
      const snapshot = actor.getSnapshot();
      expect(snapshot.context.theme).toBe("light");
    });
  });

  describe("Theme Toggle", () => {
    test("should toggle from light to dark", () => {
      actor.send({ type: "TOGGLE" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("dark");
      expect(snapshot.context.theme).toBe("dark");
    });

    test("should toggle from dark to light", () => {
      // First toggle to dark
      actor.send({ type: "TOGGLE" });
      expect(actor.getSnapshot().value).toBe("dark");

      // Then toggle back to light
      actor.send({ type: "TOGGLE" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("light");
      expect(snapshot.context.theme).toBe("light");
    });

    test("should toggle multiple times correctly", () => {
      // Toggle multiple times
      for (let i = 0; i < 5; i++) {
        actor.send({ type: "TOGGLE" });
      }

      // Should end up in dark mode (odd number of toggles)
      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("dark");
      expect(snapshot.context.theme).toBe("dark");
    });
  });

  describe("Direct Theme Setting", () => {
    test("should set light theme directly", () => {
      // First go to dark
      actor.send({ type: "TOGGLE" });
      expect(actor.getSnapshot().value).toBe("dark");

      // Then set to light
      actor.send({ type: "SET_LIGHT" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("light");
      expect(snapshot.context.theme).toBe("light");
    });

    test("should set dark theme directly", () => {
      actor.send({ type: "SET_DARK" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("dark");
      expect(snapshot.context.theme).toBe("dark");
    });

    test("should stay in same state when setting current theme", () => {
      // Already in light mode, set light again
      actor.send({ type: "SET_LIGHT" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("light");
      expect(snapshot.context.theme).toBe("light");
    });
  });

  describe("System Theme Detection", () => {
    test("should detect system theme preference", () => {
      // Mock system preference for dark mode
      const mockMatchMedia = vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });
      Object.defineProperty(window, "matchMedia", {
        value: mockMatchMedia,
      });

      actor.send({ type: "DETECT_SYSTEM_THEME" });

      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)"
      );
    });

    test("should handle missing matchMedia gracefully", () => {
      // Remove matchMedia
      Object.defineProperty(window, "matchMedia", {
        value: undefined,
      });

      // Should not throw
      expect(() => {
        actor.send({ type: "DETECT_SYSTEM_THEME" });
      }).not.toThrow();
    });
  });

  describe("Persistence", () => {
    test("should save theme to localStorage when toggling", () => {
      actor.send({ type: "TOGGLE" });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });

    test("should save theme when setting directly", () => {
      actor.send({ type: "SET_DARK" });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });

    test("should load saved theme on initialization", () => {
      mockLocalStorage.getItem.mockReturnValue("dark");

      // Create new actor to test initialization
      const newActor = createActor(themeMachine);
      newActor.start();

      // Trigger loading from storage
      newActor.send({ type: "LOAD_FROM_STORAGE", theme: "dark" });

      // Should check if the machine transitioned to dark state
      const snapshot = newActor.getSnapshot();
      expect(snapshot.value).toBe("dark");
      expect(snapshot.context.theme).toBe("dark");

      newActor.stop();
    });

    test("should handle invalid saved theme gracefully", () => {
      mockLocalStorage.getItem.mockReturnValue("invalid-theme");

      // Should not crash and should default to light
      const newActor = createActor(themeMachine);
      newActor.start();

      const snapshot = newActor.getSnapshot();
      expect(snapshot.value).toBe("light");
      expect(snapshot.context.theme).toBe("light");

      newActor.stop();
    });

    test("should handle localStorage errors gracefully", () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      // Should not crash
      expect(() => {
        const newActor = createActor(themeMachine);
        newActor.start();
        newActor.stop();
      }).not.toThrow();
    });
  });

  describe("DOM Integration", () => {
    test("should update document class when toggling theme", () => {
      // Mock document
      const mockDocument = {
        documentElement: {
          classList: {
            add: vi.fn(),
            remove: vi.fn(),
          },
        },
      };
      Object.defineProperty(global, "document", {
        value: mockDocument,
        writable: true,
      });

      actor.send({ type: "TOGGLE" });

      // Should add dark class and remove both light and dark classes first
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );
      expect(
        mockDocument.documentElement.classList.remove
      ).toHaveBeenCalledWith("light", "dark");
    });

    test("should handle missing document gracefully", () => {
      Object.defineProperty(global, "document", {
        value: undefined,
        writable: true,
      });

      // Should not throw
      expect(() => {
        actor.send({ type: "TOGGLE" });
      }).not.toThrow();
    });
  });

  describe("Event Handling", () => {
    test("should handle multiple rapid toggles", () => {
      // Send multiple toggles rapidly
      const togglePromises = Array(10)
        .fill(null)
        .map(() => {
          return new Promise((resolve) => {
            actor.send({ type: "TOGGLE" });
            resolve(true);
          });
        });

      return Promise.all(togglePromises).then(() => {
        // Should handle all toggles and end up in correct state
        const snapshot = actor.getSnapshot();
        expect(snapshot.value).toBe("light"); // Even number of toggles from light should end at light
        expect(snapshot.context.theme).toBe("light");
      });
    });

    test("should ignore unknown events", () => {
      const initialSnapshot = actor.getSnapshot();

      // Send unknown event - TypeScript would normally prevent this,
      // but we're testing runtime behavior
      actor.send({ type: "UNKNOWN_EVENT" } as { type: "UNKNOWN_EVENT" });

      const finalSnapshot = actor.getSnapshot();
      expect(finalSnapshot.value).toBe(initialSnapshot.value);
      expect(finalSnapshot.context).toEqual(initialSnapshot.context);
    });
  });

  describe("Type Safety", () => {
    test("should have correct context type", () => {
      const snapshot = actor.getSnapshot();

      // Context should have theme property
      expect(typeof snapshot.context.theme).toBe("string");
      expect(["light", "dark"]).toContain(snapshot.context.theme);
    });

    test("should handle valid events only", () => {
      const validEvents: Array<
        "TOGGLE" | "SET_LIGHT" | "SET_DARK" | "DETECT_SYSTEM_THEME"
      > = ["TOGGLE", "SET_LIGHT", "SET_DARK", "DETECT_SYSTEM_THEME"];

      validEvents.forEach((eventType) => {
        expect(() => {
          actor.send({ type: eventType });
        }).not.toThrow();
      });
    });
  });
});
