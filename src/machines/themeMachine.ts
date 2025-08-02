import { assign, createMachine } from "xstate";

export interface ThemeMachineContext {
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  systemPreference: "light" | "dark";
}

export type ThemeMachineEvent =
  | { type: "TOGGLE" }
  | { type: "SET_LIGHT" }
  | { type: "SET_DARK" }
  | { type: "SET_SYSTEM" }
  | { type: "DETECT_SYSTEM_THEME" }
  | { type: "SYSTEM_CHANGED"; preference: "light" | "dark" }
  | { type: "LOAD_FROM_STORAGE"; theme: "light" | "dark" | "system" };

const saveToLocalStorage = (theme: string) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
};

const updateDocumentClass = (theme: string) => {
  try {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  } catch (error) {
    console.warn("Failed to update document class:", error);
  }
};

export const themeMachine = createMachine({
  id: "theme",
  initial: "light",
  context: {
    theme: "light",
    resolvedTheme: "light",
    systemPreference: "light",
  } as ThemeMachineContext,
  states: {
    light: {
      entry: [
        assign({
          theme: "light",
          resolvedTheme: "light",
        }),
        () => {
          saveToLocalStorage("light");
          updateDocumentClass("light");
        },
      ],
      on: {
        TOGGLE: "dark",
        SET_DARK: "dark",
        SET_SYSTEM: "system",
        DETECT_SYSTEM_THEME: {
          actions: () => {
            if (typeof window !== "undefined" && window.matchMedia) {
              window.matchMedia("(prefers-color-scheme: dark)");
            }
          },
        },
        LOAD_FROM_STORAGE: {
          target: "loading",
        },
      },
    },
    dark: {
      entry: [
        assign({
          theme: "dark",
          resolvedTheme: "dark",
        }),
        () => {
          saveToLocalStorage("dark");
          updateDocumentClass("dark");
        },
      ],
      on: {
        TOGGLE: "light",
        SET_LIGHT: "light",
        SET_SYSTEM: "system",
        DETECT_SYSTEM_THEME: {
          actions: () => {
            if (typeof window !== "undefined" && window.matchMedia) {
              window.matchMedia("(prefers-color-scheme: dark)");
            }
          },
        },
        LOAD_FROM_STORAGE: {
          target: "loading",
        },
      },
    },
    system: {
      entry: assign({
        theme: "system",
        resolvedTheme: ({ context }) => context.systemPreference,
      }),
      on: {
        SET_LIGHT: "light",
        SET_DARK: "dark",
        SYSTEM_CHANGED: {
          actions: assign({
            systemPreference: ({ event }) => event.preference,
            resolvedTheme: ({ event }) => event.preference,
          }),
        },
        LOAD_FROM_STORAGE: {
          target: "loading",
        },
      },
    },
    loading: {
      always: [
        {
          guard: ({ context }) => context.theme === "light",
          target: "light",
        },
        {
          guard: ({ context }) => context.theme === "dark",
          target: "dark",
        },
        {
          guard: ({ context }) => context.theme === "system",
          target: "system",
        },
      ],
      entry: assign({
        theme: ({ event }) => {
          if (event.type === "LOAD_FROM_STORAGE") {
            return event.theme;
          }
          return "light";
        },
      }),
    },
  },
});
