import { beforeEach, describe, expect, it } from "vitest";
import { createActor } from "xstate";
import {
  decisionTreeMachine,
  getAvailableOptions,
  getCurrentQuestion,
} from "./decisionTreeMachine";

describe("decisionTreeMachine", () => {
  let actor: ReturnType<typeof createActor<typeof decisionTreeMachine>>;

  beforeEach(() => {
    actor = createActor(decisionTreeMachine);
    actor.start();
  });

  describe("Initial State", () => {
    it("should start in idle state", () => {
      expect(actor.getSnapshot().value).toBe("idle");
    });

    it("should have empty initial context", () => {
      const context = actor.getSnapshot().context;
      expect(context.userProfile.name).toBe("");
      expect(context.userProfile.email).toBe("");
      expect(context.userProfile.accountType).toBe(null);
      expect(context.responses).toEqual([]);
      expect(context.recommendation).toBe(null);
    });
  });

  describe("User Information Collection", () => {
    it("should transition to collectingUserInfo when START event is sent", () => {
      actor.send({
        type: "START",
        userInfo: { name: "John Doe", email: "john@example.com" },
      });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ collectingUserInfo: "accountType" });
      expect(snapshot.context.userProfile.name).toBe("John Doe");
      expect(snapshot.context.userProfile.email).toBe("john@example.com");
      expect(snapshot.context.sessionId).toMatch(/^session_/);
    });

    it("should record the initial response", () => {
      actor.send({
        type: "START",
        userInfo: { name: "John Doe", email: "john@example.com" },
      });

      const context = actor.getSnapshot().context;
      expect(context.responses).toHaveLength(1);
      expect(context.responses[0].question).toBe(
        "What is your name and email?"
      );
      expect(context.responses[0].answer).toBe("John Doe (john@example.com)");
    });
  });

  describe("Account Type Selection", () => {
    beforeEach(() => {
      actor.send({
        type: "START",
        userInfo: { name: "John Doe", email: "john@example.com" },
      });
    });

    it("should transition to issueType when account type is selected", () => {
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "premium" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ collectingUserInfo: "issueType" });
      expect(snapshot.context.userProfile.accountType).toBe("premium");
    });

    it("should record account type response", () => {
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "enterprise" });

      const context = actor.getSnapshot().context;
      expect(context.responses).toHaveLength(2);
      expect(context.responses[1].question).toBe(
        "What type of account do you have?"
      );
      expect(context.responses[1].answer).toBe("enterprise");
    });
  });

  describe("Issue Type Selection", () => {
    beforeEach(() => {
      actor.send({
        type: "START",
        userInfo: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "premium" });
    });

    it("should transition to priority when issue type is selected", () => {
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "technical" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ collectingUserInfo: "priority" });
      expect(snapshot.context.userProfile.issueType).toBe("technical");
    });

    it("should record issue type response", () => {
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "billing" });

      const context = actor.getSnapshot().context;
      expect(context.responses).toHaveLength(3);
      expect(context.responses[2].question).toBe(
        "What type of issue are you experiencing?"
      );
      expect(context.responses[2].answer).toBe("billing");
    });
  });

  describe("Priority Selection and Routing", () => {
    beforeEach(() => {
      actor.send({
        type: "START",
        userInfo: { name: "John Doe", email: "john@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "premium" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "technical" });
    });

    it("should route to premiumTechnical for premium technical issues", () => {
      actor.send({ type: "SELECT_PRIORITY", priority: "medium" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ premiumTechnical: "techQuestions" });
      expect(snapshot.context.userProfile.priority).toBe("medium");
    });

    it("should generate appropriate recommendation for premium technical", () => {
      actor.send({ type: "SELECT_PRIORITY", priority: "high" });

      const context = actor.getSnapshot().context;
      expect(context.recommendation).not.toBe(null);
      expect(context.recommendation?.department).toBe(
        "Premium Technical Support"
      );
      expect(context.recommendation?.estimatedWaitTime).toBe("5-10 minutes");
      expect(context.recommendation?.escalationLevel).toBe(2);
    });
  });

  describe("Decision Tree Routing Logic", () => {
    it("should route enterprise customers to enterprise support", () => {
      actor.send({
        type: "START",
        userInfo: { name: "Enterprise User", email: "user@enterprise.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "enterprise" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
      actor.send({ type: "SELECT_PRIORITY", priority: "low" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("enterpriseSupport");
      expect(snapshot.context.recommendation?.department).toBe(
        "Enterprise Support"
      );
    });

    it("should route urgent issues to urgent escalation", () => {
      actor.send({
        type: "START",
        userInfo: { name: "Free User", email: "user@free.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
      actor.send({ type: "SELECT_PRIORITY", priority: "urgent" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("urgentEscalation");
      expect(snapshot.context.recommendation?.department).toBe(
        "Critical Support"
      );
    });

    it("should route billing issues to billing support", () => {
      actor.send({
        type: "START",
        userInfo: { name: "Free User", email: "user@free.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "billing" });
      actor.send({ type: "SELECT_PRIORITY", priority: "medium" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ billingSupport: "billingQuestions" });
      expect(snapshot.context.recommendation?.department).toBe(
        "Billing Support"
      );
    });

    it("should route free general issues to general triage", () => {
      actor.send({
        type: "START",
        userInfo: { name: "Free User", email: "user@free.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
      actor.send({ type: "SELECT_PRIORITY", priority: "low" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toEqual({ generalTriage: "additionalQuestions" });
      expect(snapshot.context.recommendation?.department).toBe(
        "General Support"
      );
    });
  });

  describe("Additional Questions and Escalation", () => {
    beforeEach(() => {
      // Set up for general triage
      actor.send({
        type: "START",
        userInfo: { name: "User", email: "user@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
      actor.send({ type: "SELECT_PRIORITY", priority: "low" });
    });

    it("should handle additional questions in general triage", () => {
      const initialState = actor.getSnapshot().value;
      expect(initialState).toEqual({ generalTriage: "additionalQuestions" });

      actor.send({
        type: "ANSWER_QUESTION",
        question: "Can you provide more details?",
        answer: "I need help with my account settings",
      });

      const context = actor.getSnapshot().context;
      expect(context.responses).toHaveLength(5); // START + 3 selections + 1 answer
      const lastResponse = context.responses[context.responses.length - 1];
      expect(lastResponse.question).toBe("Can you provide more details?");
      expect(lastResponse.answer).toBe("I need help with my account settings");
    });

    it("should escalate to urgent when urgent keywords are mentioned", () => {
      actor.send({
        type: "ANSWER_QUESTION",
        question: "Can you provide more details?",
        answer: "My production system is completely down",
      });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("urgentEscalation");
      expect(snapshot.context.recommendation?.department).toBe(
        "Critical Support"
      );
    });

    it("should detect urgent keywords in answers", () => {
      const urgentKeywords = [
        "down",
        "broken",
        "urgent",
        "critical",
        "production",
      ];

      urgentKeywords.forEach((keyword) => {
        // Reset to general triage
        actor.send({ type: "RESTART" });
        actor.send({
          type: "START",
          userInfo: { name: "User", email: "user@example.com" },
        });
        actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
        actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
        actor.send({ type: "SELECT_PRIORITY", priority: "low" });

        actor.send({
          type: "ANSWER_QUESTION",
          question: "Details?",
          answer: `System is ${keyword}`,
        });

        expect(actor.getSnapshot().value).toBe("urgentEscalation");
      });
    });
  });

  describe("Human Agent Transfer", () => {
    beforeEach(() => {
      actor.send({
        type: "START",
        userInfo: { name: "User", email: "user@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "premium" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "technical" });
      actor.send({ type: "SELECT_PRIORITY", priority: "high" });
    });

    it("should transition to human agent when requested", () => {
      actor.send({ type: "REQUEST_HUMAN_AGENT" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("humanAgent");
      expect(snapshot.context.recommendation?.department).toBe(
        "Human Agent Transfer"
      );
    });

    it("should update recommendation for human agent transfer", () => {
      actor.send({ type: "REQUEST_HUMAN_AGENT" });

      const context = actor.getSnapshot().context;
      expect(context.recommendation?.estimatedWaitTime).toBe("Connecting...");
      expect(context.recommendation?.suggestedActions).toContain(
        "Connecting to human agent"
      );
    });
  });

  describe("Session Completion", () => {
    beforeEach(() => {
      actor.send({
        type: "START",
        userInfo: { name: "User", email: "user@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "free" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "general" });
      actor.send({ type: "SELECT_PRIORITY", priority: "low" });
    });

    it("should complete the session and add completion response", () => {
      actor.send({ type: "COMPLETE" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("completed");

      const context = snapshot.context;
      const lastResponse = context.responses[context.responses.length - 1];
      expect(lastResponse.question).toBe("Session status");
      expect(lastResponse.answer).toBe("Completed successfully");
    });
  });

  describe("Session Restart", () => {
    it("should reset all context when restarted", () => {
      // Set up a full session
      actor.send({
        type: "START",
        userInfo: { name: "User", email: "user@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "premium" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "technical" });
      actor.send({ type: "SELECT_PRIORITY", priority: "high" });

      // Restart
      actor.send({ type: "RESTART" });

      const snapshot = actor.getSnapshot();
      expect(snapshot.value).toBe("idle");

      const context = snapshot.context;
      expect(context.userProfile.name).toBe("");
      expect(context.userProfile.email).toBe("");
      expect(context.userProfile.accountType).toBe(null);
      expect(context.responses).toEqual([]);
      expect(context.recommendation).toBe(null);
      expect(context.sessionId).toBe("");
    });
  });

  describe("Helper Functions", () => {
    describe("getCurrentQuestion", () => {
      it("should return correct questions for each state", () => {
        expect(getCurrentQuestion("collectingUserInfo.accountType")).toBe(
          "What type of account do you have?"
        );
        expect(getCurrentQuestion("collectingUserInfo.issueType")).toBe(
          "What type of issue are you experiencing?"
        );
        expect(getCurrentQuestion("collectingUserInfo.priority")).toBe(
          "How urgent is this issue?"
        );
        expect(getCurrentQuestion("premiumTechnical.techQuestions")).toBe(
          "Can you describe the technical issue in more detail?"
        );
        expect(getCurrentQuestion("billingSupport.billingQuestions")).toBe(
          "What specific billing issue are you experiencing?"
        );
        expect(getCurrentQuestion("generalTriage.additionalQuestions")).toBe(
          "Can you provide more details about your issue?"
        );
        expect(getCurrentQuestion("unknown")).toBe("");
      });
    });

    describe("getAvailableOptions", () => {
      it("should return correct options for each state", () => {
        expect(getAvailableOptions("collectingUserInfo.accountType")).toEqual([
          "free",
          "premium",
          "enterprise",
        ]);
        expect(getAvailableOptions("collectingUserInfo.issueType")).toEqual([
          "technical",
          "billing",
          "general",
        ]);
        expect(getAvailableOptions("collectingUserInfo.priority")).toEqual([
          "low",
          "medium",
          "high",
          "urgent",
        ]);
        expect(getAvailableOptions("unknown")).toEqual([]);
      });
    });
  });

  describe("Context Management", () => {
    it("should maintain session history throughout the flow", () => {
      actor.send({
        type: "START",
        userInfo: { name: "Test User", email: "test@example.com" },
      });
      actor.send({ type: "SELECT_ACCOUNT_TYPE", accountType: "enterprise" });
      actor.send({ type: "SELECT_ISSUE_TYPE", issueType: "technical" });
      actor.send({ type: "SELECT_PRIORITY", priority: "urgent" });

      const context = actor.getSnapshot().context;
      expect(context.responses).toHaveLength(4);
      expect(context.sessionId).toMatch(/^session_/);
      expect(context.userProfile.name).toBe("Test User");
      expect(context.userProfile.email).toBe("test@example.com");
      expect(context.userProfile.accountType).toBe("enterprise");
      expect(context.userProfile.issueType).toBe("technical");
      expect(context.userProfile.priority).toBe("urgent");
    });

    it("should generate unique session IDs", () => {
      const actor1 = createActor(decisionTreeMachine).start();
      const actor2 = createActor(decisionTreeMachine).start();

      actor1.send({
        type: "START",
        userInfo: { name: "User 1", email: "user1@example.com" },
      });
      actor2.send({
        type: "START",
        userInfo: { name: "User 2", email: "user2@example.com" },
      });

      const sessionId1 = actor1.getSnapshot().context.sessionId;
      const sessionId2 = actor2.getSnapshot().context.sessionId;

      expect(sessionId1).not.toBe(sessionId2);
      expect(sessionId1).toMatch(/^session_/);
      expect(sessionId2).toMatch(/^session_/);
    });
  });
});
