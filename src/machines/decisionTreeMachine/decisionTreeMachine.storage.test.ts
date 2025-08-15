import { beforeEach, describe, expect, it, vi } from "vitest";
import { createActor } from "xstate";
import {
  clearDecisionTreeDataFromStorage,
  decisionTreeMachine,
  loadDecisionTreeDataFromStorage,
  saveDecisionTreeDataToStorage,
} from ".";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Decision Tree Storage Integration", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("Storage Functions", () => {
    it("should save and load decision tree data", () => {
      const testContext = {
        userProfile: {
          name: "John Doe",
          email: "john@example.com",
          accountType: "premium" as const,
          issueType: "technical" as const,
          priority: "high" as const,
        },
        responses: [
          {
            question: "What is your name?",
            answer: "John Doe",
            timestamp: new Date("2024-01-01T12:00:00Z"),
          },
        ],
        recommendation: null,
        sessionId: "test-session-123",
      };

      // Save to storage
      saveDecisionTreeDataToStorage(testContext);

      // Verify data was saved
      const savedData = localStorage.getItem("decision-tree-state");
      expect(savedData).toBeTruthy();

      // Load from storage
      const loadedData = loadDecisionTreeDataFromStorage();
      expect(loadedData).toEqual({
        userProfile: {
          name: "John Doe",
          email: "john@example.com",
          accountType: "premium",
          issueType: "technical",
          priority: "high",
        },
        responses: [
          {
            question: "What is your name?",
            answer: "John Doe",
            timestamp: new Date("2024-01-01T12:00:00Z"),
          },
        ],
        recommendation: null,
        sessionId: "test-session-123",
      });
    });

    it("should handle expired data", () => {
      const expiredData = {
        context: { userProfile: { name: "Test" } },
        timestamp: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
      };

      localStorage.setItem("decision-tree-state", JSON.stringify(expiredData));

      const loadedData = loadDecisionTreeDataFromStorage();
      expect(loadedData).toBeNull();
      expect(localStorage.getItem("decision-tree-state")).toBeNull();
    });

    it("should clear storage data", () => {
      localStorage.setItem(
        "decision-tree-state",
        JSON.stringify({ test: "data" })
      );

      clearDecisionTreeDataFromStorage();

      expect(localStorage.getItem("decision-tree-state")).toBeNull();
    });

    it("should handle invalid JSON data", () => {
      localStorage.setItem("decision-tree-state", "invalid-json");

      const loadedData = loadDecisionTreeDataFromStorage();
      expect(loadedData).toBeNull();
      expect(localStorage.getItem("decision-tree-state")).toBeNull();
    });
  });

  describe("Machine Integration", () => {
    it("should automatically save state on transitions", () => {
      const actor = createActor(decisionTreeMachine);
      actor.start();

      // Mock localStorage to track calls
      const setItemSpy = vi.spyOn(localStorage, "setItem");

      // Start the machine
      actor.send({
        type: "START",
        userInfo: { name: "Test User", email: "test@example.com" },
      });

      // Should have saved after START event
      expect(setItemSpy).toHaveBeenCalledWith(
        "decision-tree-state",
        expect.stringContaining("Test User")
      );

      actor.stop();
    });

    it("should load saved state on initialization", () => {
      // Pre-populate localStorage with test data
      const testData = {
        context: {
          userProfile: {
            name: "Restored User",
            email: "restored@example.com",
            accountType: "premium",
            issueType: null,
            priority: null,
          },
          responses: [],
          recommendation: null,
          sessionId: "restored-session",
        },
        timestamp: Date.now(),
      };

      localStorage.setItem("decision-tree-state", JSON.stringify(testData));

      // Create and start actor
      const actor = createActor(decisionTreeMachine);
      actor.start();

      // Check if the context was restored
      const state = actor.getSnapshot();
      expect(state.context.userProfile.name).toBe("Restored User");
      expect(state.context.userProfile.email).toBe("restored@example.com");
      expect(state.context.sessionId).toBe("restored-session");

      actor.stop();
    });

    it("should restore to the correct state based on saved context", () => {
      // Test restoring to different states based on context
      const testCases = [
        {
          name: "account type selection",
          context: {
            userProfile: {
              name: "Test User",
              email: "test@example.com",
              accountType: null,
              issueType: null,
              priority: null,
            },
            responses: [],
            recommendation: null,
            sessionId: "test-session",
          },
          expectedState: "collectingUserInfo.accountType",
        },
        {
          name: "issue type selection",
          context: {
            userProfile: {
              name: "Test User",
              email: "test@example.com",
              accountType: "premium",
              issueType: null,
              priority: null,
            },
            responses: [],
            recommendation: null,
            sessionId: "test-session",
          },
          expectedState: "collectingUserInfo.issueType",
        },
        {
          name: "priority selection",
          context: {
            userProfile: {
              name: "Test User",
              email: "test@example.com",
              accountType: "premium",
              issueType: "technical",
              priority: null,
            },
            responses: [],
            recommendation: null,
            sessionId: "test-session",
          },
          expectedState: "collectingUserInfo.priority",
        },
        {
          name: "premium technical support",
          context: {
            userProfile: {
              name: "Test User",
              email: "test@example.com",
              accountType: "premium",
              issueType: "technical",
              priority: "high",
            },
            responses: [],
            recommendation: {
              department: "Premium Technical Support",
              estimatedWaitTime: "5-10 minutes",
              escalationLevel: 2,
              suggestedActions: ["Technical specialist assignment"],
            },
            sessionId: "test-session",
          },
          expectedState: "premiumTechnical.techQuestions",
        },
      ];

      testCases.forEach((testCase) => {
        localStorageMock.clear();

        // Save test context
        const testData = {
          context: testCase.context,
          timestamp: Date.now(),
        };
        localStorage.setItem("decision-tree-state", JSON.stringify(testData));

        // Create and start actor
        const actor = createActor(decisionTreeMachine);
        actor.start();

        // Check if the actor is in the expected state
        const state = actor.getSnapshot();
        const stateValue = state.value;

        if (typeof stateValue === "string") {
          expect(stateValue).toBe(testCase.expectedState);
        } else if (typeof stateValue === "object") {
          // Handle nested states
          const stateString = Object.keys(stateValue)
            .map((key) => {
              const nested = (stateValue as Record<string, string>)[key];
              return typeof nested === "string" ? `${key}.${nested}` : key;
            })
            .join(".");
          expect(stateString).toBe(testCase.expectedState);
        }

        actor.stop();
      });
    });

    it("should clear storage on restart", () => {
      const actor = createActor(decisionTreeMachine);
      actor.start();

      // Add some data
      actor.send({
        type: "START",
        userInfo: { name: "Test User", email: "test@example.com" },
      });

      // Verify data is saved
      expect(localStorage.getItem("decision-tree-state")).toBeTruthy();

      // Mock localStorage to track removal
      const removeItemSpy = vi.spyOn(localStorage, "removeItem");

      // Restart the machine
      actor.send({ type: "RESTART" });

      // Should have cleared storage
      expect(removeItemSpy).toHaveBeenCalledWith("decision-tree-state");

      actor.stop();
    });
  });
});
