import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ActorRefFrom, createActor } from "xstate";
import {
  clearFormDataFromStorage,
  FormData,
  formMachine,
  loadFormDataFromStorage,
  saveFormDataToStorage,
} from "./formMachine";

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

// Mock window object
Object.defineProperty(global, "window", {
  value: { localStorage: mockLocalStorage },
  writable: true,
});

describe("formMachine", () => {
  let actor: ActorRefFrom<typeof formMachine>;

  beforeEach(() => {
    // Reset localStorage mocks
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();

    // Create a new actor for each test
    actor = createActor(formMachine);
    actor.start();
  });

  afterEach(() => {
    actor.stop();
  });

  describe("Initial State", () => {
    test("should start in step1 state", () => {
      expect(actor.getSnapshot().value).toBe("step1");
    });

    test("should have empty form data initially", () => {
      const snapshot = actor.getSnapshot();
      expect(snapshot.context.formData).toEqual({
        step1: { name: "", email: "" },
        step2: { address: "", city: "" },
        step3: { preferences: [], newsletter: false },
      });
    });

    test("should have no errors initially", () => {
      const snapshot = actor.getSnapshot();
      expect(snapshot.context.errors).toEqual({});
    });

    test("should start with currentStep 1", () => {
      const snapshot = actor.getSnapshot();
      expect(snapshot.context.currentStep).toBe(1);
    });
  });

  describe("Step 1 Navigation", () => {
    test("should advance from step1 to step2 with valid data", () => {
      // First update the data
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });

      // Then advance
      actor.send({ type: "NEXT" });

      expect(actor.getSnapshot().value).toBe("step2");
      expect(actor.getSnapshot().context.currentStep).toBe(2);
    });

    test("should stay in step1 with invalid data", () => {
      // Update with invalid data
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "", email: "invalid-email" },
      });

      // Try to advance
      actor.send({ type: "NEXT" });

      expect(actor.getSnapshot().value).toBe("step1");
      expect(actor.getSnapshot().context.errors).toEqual(
        expect.objectContaining({
          name: "Name is required",
          email: "Please enter a valid email address",
        })
      );
    });

    test("should update step1 data correctly", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe" },
      });

      const snapshot = actor.getSnapshot();
      expect(snapshot.context.formData.step1.name).toBe("John Doe");
    });

    test("should clear errors when updating step1 data", () => {
      // First create some errors
      actor.send({ type: "NEXT" });
      expect(actor.getSnapshot().context.errors.name).toBeTruthy();

      // Then update data should clear errors
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John" },
      });

      const snapshot = actor.getSnapshot();
      expect(snapshot.context.errors.name).toBeUndefined();
    });
  });

  describe("Step 2 Navigation", () => {
    beforeEach(() => {
      // Navigate to step2
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "NEXT" });
    });

    test("should advance from step2 to step3 with valid data", () => {
      actor.send({
        type: "UPDATE_STEP2",
        data: { address: "123 Main St", city: "New York" },
      });

      actor.send({ type: "NEXT" });

      expect(actor.getSnapshot().value).toBe("step3");
      expect(actor.getSnapshot().context.currentStep).toBe(3);
    });

    test("should go back from step2 to step1", () => {
      actor.send({ type: "PREV" });

      expect(actor.getSnapshot().value).toBe("step1");
      expect(actor.getSnapshot().context.currentStep).toBe(1);
    });

    test("should stay in step2 with invalid data", () => {
      actor.send({
        type: "UPDATE_STEP2",
        data: { address: "", city: "" },
      });

      actor.send({ type: "NEXT" });

      expect(actor.getSnapshot().value).toBe("step2");
      expect(actor.getSnapshot().context.errors).toEqual(
        expect.objectContaining({
          address: "Address is required",
          city: "City is required",
        })
      );
    });
  });

  describe("Step 3 Navigation", () => {
    beforeEach(() => {
      // Navigate to step3
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "NEXT" });

      actor.send({
        type: "UPDATE_STEP2",
        data: { address: "123 Main St", city: "New York" },
      });
      actor.send({ type: "NEXT" });
    });

    test("should submit form from step3", () => {
      actor.send({ type: "SUBMIT" });

      expect(actor.getSnapshot().value).toBe("submitted");
    });

    test("should go back from step3 to step2", () => {
      actor.send({ type: "PREV" });

      expect(actor.getSnapshot().value).toBe("step2");
      expect(actor.getSnapshot().context.currentStep).toBe(2);
    });

    test("should update step3 data correctly", () => {
      actor.send({
        type: "UPDATE_STEP3",
        data: { preferences: ["option1", "option2"], newsletter: true },
      });

      const snapshot = actor.getSnapshot();
      expect(snapshot.context.formData.step3.preferences).toEqual([
        "option1",
        "option2",
      ]);
      expect(snapshot.context.formData.step3.newsletter).toBe(true);
    });
  });

  describe("Form Reset", () => {
    test("should reset form data and return to step1", () => {
      // Fill form and go to step3
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "NEXT" });

      actor.send({
        type: "UPDATE_STEP2",
        data: { address: "123 Main St", city: "New York" },
      });
      actor.send({ type: "NEXT" });

      // Reset form
      actor.send({ type: "RESET" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("step1");
      expect(snapshot.context.formData).toEqual({
        step1: { name: "", email: "" },
        step2: { address: "", city: "" },
        step3: { preferences: [], newsletter: false },
      });
      expect(snapshot.context.errors).toEqual({});
      expect(snapshot.context.currentStep).toBe(1);
    });

    test("should clear localStorage on reset", () => {
      actor.send({ type: "RESET" });

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "multiStepFormData"
      );
    });
  });

  describe("Data Persistence", () => {
    test("should save form data when updating step1", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "multiStepFormData",
        expect.stringContaining('"name":"John Doe"')
      );
    });

    test("should save progress when advancing steps", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });

      mockLocalStorage.setItem.mockClear();

      actor.send({ type: "NEXT" });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "multiStepFormData",
        expect.stringContaining('"currentStep":2')
      );
    });

    test("should load saved data and navigate to correct step", () => {
      const savedData = {
        formData: {
          step1: { name: "Jane Doe", email: "jane@example.com" },
          step2: { address: "456 Oak St", city: "Boston" },
          step3: { preferences: ["pref1"], newsletter: true },
        },
        currentStep: 2,
        timestamp: Date.now(),
      };

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedData));

      actor.send({ type: "LOAD_SAVED_DATA" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("step2");
      expect(snapshot.context.formData).toEqual(savedData.formData);
      expect(snapshot.context.currentStep).toBe(2);
    });

    test("should handle invalid saved data gracefully", () => {
      mockLocalStorage.getItem.mockReturnValue("invalid-json");

      actor.send({ type: "LOAD_SAVED_DATA" });

      // Should not crash and should keep original state
      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("step1");
      expect(snapshot.context.formData).toEqual({
        step1: { name: "", email: "" },
        step2: { address: "", city: "" },
        step3: { preferences: [], newsletter: false },
      });
    });
  });

  describe("Form Validation", () => {
    test("should validate required fields in step1", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "", email: "" },
      });
      actor.send({ type: "NEXT" });

      const errors = actor.getSnapshot().context.errors;
      expect(errors.name).toBe("Name is required");
      expect(errors.email).toBe("Email is required");
    });

    test("should validate email format in step1", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John", email: "invalid-email" },
      });
      actor.send({ type: "NEXT" });

      const errors = actor.getSnapshot().context.errors;
      expect(errors.email).toBe("Please enter a valid email address");
    });

    test("should validate name length in step1", () => {
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "a", email: "test@example.com" },
      });
      actor.send({ type: "NEXT" });

      const errors = actor.getSnapshot().context.errors;
      expect(errors.name).toBe("Name must be at least 2 characters long");
    });

    test("should validate address in step2", () => {
      // Go to step2
      actor.send({
        type: "UPDATE_STEP1",
        data: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "NEXT" });

      // Try to advance with invalid address
      actor.send({
        type: "UPDATE_STEP2",
        data: { address: "abc", city: "New York" },
      });
      actor.send({ type: "NEXT" });

      const errors = actor.getSnapshot().context.errors;
      expect(errors.address).toBe("Address must be at least 5 characters long");
    });
  });
});

describe("localStorage utility functions", () => {
  const testData: FormData = {
    step1: { name: "Test User", email: "test@example.com" },
    step2: { address: "123 Test St", city: "Test City" },
    step3: { preferences: ["test"], newsletter: true },
  };

  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
  });

  describe("saveFormDataToStorage", () => {
    test("should save data to localStorage", () => {
      saveFormDataToStorage(testData, 2);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "multiStepFormData",
        expect.stringContaining('"currentStep":2')
      );
    });

    test("should handle errors gracefully", () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      // Should not throw
      expect(() => saveFormDataToStorage(testData, 1)).not.toThrow();
    });
  });

  describe("loadFormDataFromStorage", () => {
    test("should load data from localStorage", () => {
      const savedData = {
        formData: testData,
        currentStep: 2,
        timestamp: Date.now(),
      };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedData));

      const result = loadFormDataFromStorage();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "multiStepFormData"
      );
      expect(result).toEqual({
        formData: testData,
        currentStep: 2,
      });
    });

    test("should return null when no data exists", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });

    test("should return null when data is invalid JSON", () => {
      mockLocalStorage.getItem.mockReturnValue("invalid-json");

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });

    test("should return null when data is expired", () => {
      const expiredData = {
        formData: testData,
        currentStep: 2,
        timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredData));

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });

    test("should handle localStorage errors gracefully", () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });
  });

  describe("clearFormDataFromStorage", () => {
    test("should remove data from localStorage", () => {
      clearFormDataFromStorage();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "multiStepFormData"
      );
    });

    test("should handle errors gracefully", () => {
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      // Should not throw
      expect(() => clearFormDataFromStorage()).not.toThrow();
    });
  });
});
