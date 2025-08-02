import { assign, createMachine } from "xstate";

// Local storage key for form persistence
const FORM_STORAGE_KEY = "multiStepFormData";

export interface FormData {
  step1: {
    name: string;
    email: string;
  };
  step2: {
    address: string;
    city: string;
  };
  step3: {
    preferences: string[];
    newsletter: boolean;
  };
}

export interface FormContext {
  formData: FormData;
  errors: Record<string, string>;
  currentStep: number;
}

export type FormEvent =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMIT" }
  | { type: "RESET" }
  | { type: "UPDATE_STEP1"; data: Partial<FormData["step1"]> }
  | { type: "UPDATE_STEP2"; data: Partial<FormData["step2"]> }
  | { type: "UPDATE_STEP3"; data: Partial<FormData["step3"]> }
  | { type: "LOAD_SAVED_DATA" };

// Utility functions for localStorage persistence
export const saveFormDataToStorage = (
  formData: FormData,
  currentStep: number
) => {
  if (typeof window !== "undefined") {
    try {
      const dataToSave = {
        formData,
        currentStep,
        timestamp: Date.now(),
      };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.warn("Failed to save form data to localStorage:", error);
    }
  }
};

export const loadFormDataFromStorage = (): {
  formData: FormData;
  currentStep: number;
} | null => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Optional: Add expiration check (e.g., 24 hours)
        const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired && parsed.formData && parsed.currentStep) {
          return {
            formData: parsed.formData,
            currentStep: parsed.currentStep,
          };
        }
      }
    } catch (error) {
      console.warn("Failed to load form data from localStorage:", error);
    }
  }
  return null;
};

export const clearFormDataFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear form data from localStorage:", error);
    }
  }
};

const validateStep1 = (data: FormData["step1"]): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.name.trim())) {
    errors.name =
      "Name can only contain letters, spaces, hyphens, and apostrophes";
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

const validateStep2 = (data: FormData["step2"]): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Address validation
  if (!data.address.trim()) {
    errors.address = "Address is required";
  } else if (data.address.trim().length < 5) {
    errors.address = "Address must be at least 5 characters long";
  }

  // City validation
  if (!data.city.trim()) {
    errors.city = "City is required";
  } else if (data.city.trim().length < 2) {
    errors.city = "City must be at least 2 characters long";
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.city.trim())) {
    errors.city =
      "City can only contain letters, spaces, hyphens, and apostrophes";
  }

  return errors;
};

export const formMachine = createMachine({
  id: "multiStepForm",
  types: {} as {
    context: FormContext;
    events: FormEvent;
  },
  initial: "step1",
  context: {
    formData: {
      step1: { name: "", email: "" },
      step2: { address: "", city: "" },
      step3: { preferences: [], newsletter: false },
    },
    errors: {},
    currentStep: 1,
  },
  states: {
    step1: {
      entry: assign({ currentStep: 1 }),
      on: {
        LOAD_SAVED_DATA: [
          {
            target: "step3",
            actions: assign(({ context }) => {
              const saved = loadFormDataFromStorage();
              if (saved) {
                return {
                  formData: saved.formData,
                  currentStep: saved.currentStep,
                  errors: {},
                };
              }
              return context;
            }),
            guard: () => {
              const saved = loadFormDataFromStorage();
              return saved?.currentStep === 3;
            },
          },
          {
            target: "step2",
            actions: assign(({ context }) => {
              const saved = loadFormDataFromStorage();
              if (saved) {
                return {
                  formData: saved.formData,
                  currentStep: saved.currentStep,
                  errors: {},
                };
              }
              return context;
            }),
            guard: () => {
              const saved = loadFormDataFromStorage();
              return saved?.currentStep === 2;
            },
          },
          {
            actions: assign(({ context }) => {
              const saved = loadFormDataFromStorage();
              if (saved) {
                return {
                  formData: saved.formData,
                  currentStep: saved.currentStep,
                  errors: {},
                };
              }
              return context;
            }),
          },
        ],
        UPDATE_STEP1: {
          actions: [
            assign({
              formData: ({ context, event }) => ({
                ...context.formData,
                step1: { ...context.formData.step1, ...event.data },
              }),
              // Clear errors when user starts typing
              errors: ({ context }) => {
                const newErrors = { ...context.errors };
                delete newErrors.name;
                delete newErrors.email;
                return newErrors;
              },
            }),
            // Save to localStorage after updating
            ({ context, event }) => {
              const updatedFormData = {
                ...context.formData,
                step1: { ...context.formData.step1, ...event.data },
              };
              saveFormDataToStorage(updatedFormData, context.currentStep);
            },
          ],
        },
        NEXT: [
          {
            target: "step2",
            actions: [
              assign({ errors: {} }),
              // Save progress when moving to next step
              ({ context }) => {
                saveFormDataToStorage(context.formData, 2);
              },
            ],
            guard: ({ context }) => {
              const errors = validateStep1(context.formData.step1);
              return Object.keys(errors).length === 0;
            },
          },
          {
            // If validation fails, stay in step1 but show errors
            actions: assign({
              errors: ({ context }) => validateStep1(context.formData.step1),
            }),
          },
        ],
        RESET: {
          target: "step1",
          actions: [
            assign({
              formData: {
                step1: { name: "", email: "" },
                step2: { address: "", city: "" },
                step3: { preferences: [], newsletter: false },
              },
              errors: {},
              currentStep: 1,
            }),
            // Clear localStorage on reset
            () => {
              clearFormDataFromStorage();
            },
          ],
        },
      },
    },
    step2: {
      entry: assign({ currentStep: 2 }),
      on: {
        UPDATE_STEP2: {
          actions: [
            assign({
              formData: ({ context, event }) => ({
                ...context.formData,
                step2: { ...context.formData.step2, ...event.data },
              }),
              // Clear errors when user starts typing
              errors: ({ context }) => {
                const newErrors = { ...context.errors };
                delete newErrors.address;
                delete newErrors.city;
                return newErrors;
              },
            }),
            // Save to localStorage after updating
            ({ context, event }) => {
              const updatedFormData = {
                ...context.formData,
                step2: { ...context.formData.step2, ...event.data },
              };
              saveFormDataToStorage(updatedFormData, context.currentStep);
            },
          ],
        },
        NEXT: [
          {
            target: "step3",
            actions: [
              assign({ errors: {} }),
              // Save progress when moving to next step
              ({ context }) => {
                saveFormDataToStorage(context.formData, 3);
              },
            ],
            guard: ({ context }) => {
              const errors = validateStep2(context.formData.step2);
              return Object.keys(errors).length === 0;
            },
          },
          {
            // If validation fails, stay in step2 but show errors
            actions: assign({
              errors: ({ context }) => validateStep2(context.formData.step2),
            }),
          },
        ],
        PREV: "step1",
        RESET: {
          target: "step1",
          actions: [
            assign({
              formData: {
                step1: { name: "", email: "" },
                step2: { address: "", city: "" },
                step3: { preferences: [], newsletter: false },
              },
              errors: {},
              currentStep: 1,
            }),
            // Clear localStorage on reset
            () => {
              clearFormDataFromStorage();
            },
          ],
        },
      },
    },
    step3: {
      entry: assign({ currentStep: 3 }),
      on: {
        UPDATE_STEP3: {
          actions: [
            assign({
              formData: ({ context, event }) => ({
                ...context.formData,
                step3: { ...context.formData.step3, ...event.data },
              }),
            }),
            // Save to localStorage after updating
            ({ context, event }) => {
              const updatedFormData = {
                ...context.formData,
                step3: { ...context.formData.step3, ...event.data },
              };
              saveFormDataToStorage(updatedFormData, context.currentStep);
            },
          ],
        },
        SUBMIT: {
          target: "submitted",
          actions: [
            // Clear localStorage on successful submission
            () => {
              clearFormDataFromStorage();
            },
          ],
        },
        PREV: "step2",
        RESET: {
          target: "step1",
          actions: [
            assign({
              formData: {
                step1: { name: "", email: "" },
                step2: { address: "", city: "" },
                step3: { preferences: [], newsletter: false },
              },
              errors: {},
              currentStep: 1,
            }),
            // Clear localStorage on reset
            () => {
              clearFormDataFromStorage();
            },
          ],
        },
      },
    },
    submitted: {
      on: {
        RESET: {
          target: "step1",
          actions: [
            assign({
              formData: {
                step1: { name: "", email: "" },
                step2: { address: "", city: "" },
                step3: { preferences: [], newsletter: false },
              },
              errors: {},
              currentStep: 1,
            }),
            // Clear localStorage on reset
            () => {
              clearFormDataFromStorage();
            },
          ],
        },
      },
    },
  },
});
