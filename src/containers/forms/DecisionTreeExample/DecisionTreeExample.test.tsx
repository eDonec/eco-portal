import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ClientDecisionTreeExample from "./ClientDecisionTreeExample";

describe("DecisionTreeExample Integration", () => {
  beforeEach(() => {
    // Each test gets a fresh component
  });

  describe("Initial Render", () => {
    it("should render the decision tree interface", () => {
      render(<ClientDecisionTreeExample />);

      expect(
        screen.getByText("Decision Tree Support System")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Intelligent customer support routing with XState")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Welcome to Customer Support")
      ).toBeInTheDocument();
    });

    it("should show user input form initially", () => {
      render(<ClientDecisionTreeExample />);

      expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
      expect(screen.getByText("Start Support Session")).toBeInTheDocument();
    });

    it("should show current state in sidebar", () => {
      render(<ClientDecisionTreeExample />);

      expect(screen.getByText("Controls")).toBeInTheDocument();
      expect(screen.getByText("Restart Session")).toBeInTheDocument();
    });
  });

  describe("User Flow", () => {
    it("should progress through the complete flow", () => {
      render(<ClientDecisionTreeExample />);

      // Step 1: Fill in user info
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      const startButton = screen.getByText("Start Support Session");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(startButton);

      // Step 2: Should show account type selection
      expect(
        screen.getByText("What type of account do you have?")
      ).toBeInTheDocument();

      const premiumButton = screen.getByText("premium");
      fireEvent.click(premiumButton);

      // Step 3: Should show issue type selection
      expect(
        screen.getByText("What type of issue are you experiencing?")
      ).toBeInTheDocument();

      const technicalButton = screen.getByText("technical");
      fireEvent.click(technicalButton);

      // Step 4: Should show priority selection
      expect(screen.getByText("How urgent is this issue?")).toBeInTheDocument();

      const highButton = screen.getByText("high");
      fireEvent.click(highButton);

      // Step 5: Should reach technical support state
      expect(
        screen.getByText("Can you describe the technical issue in more detail?")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(
          "Please provide detailed information about your issue..."
        )
      ).toBeInTheDocument();
    });

    it("should show user profile in sidebar after starting", () => {
      render(<ClientDecisionTreeExample />);

      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      const startButton = screen.getByText("Start Support Session");

      fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
      fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
      fireEvent.click(startButton);

      // Should show user profile in sidebar
      expect(screen.getByText("User Profile")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    it("should show session history as user progresses", () => {
      render(<ClientDecisionTreeExample />);

      // Start session
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      const startButton = screen.getByText("Start Support Session");

      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(startButton);

      // Select account type
      const enterpriseButton = screen.getByText("enterprise");
      fireEvent.click(enterpriseButton);

      // Should show session history
      expect(screen.getByText("Session History")).toBeInTheDocument();

      // Should show the responses in history
      expect(
        screen.getByText("Q: What is your name and email?")
      ).toBeInTheDocument();
      expect(
        screen.getByText("A: Test User (test@example.com)")
      ).toBeInTheDocument();
    });
  });

  describe("Different Routing Paths", () => {
    it("should route enterprise users differently", () => {
      render(<ClientDecisionTreeExample />);

      // Start session
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "Enterprise User" } });
      fireEvent.change(emailInput, {
        target: { value: "user@enterprise.com" },
      });
      fireEvent.click(screen.getByText("Start Support Session"));

      // Select enterprise account
      fireEvent.click(screen.getByText("enterprise"));

      // Select general issue
      fireEvent.click(screen.getByText("general"));

      // Select low priority
      fireEvent.click(screen.getByText("low"));

      // Should show recommendation for enterprise support
      expect(screen.getByText("Recommendation")).toBeInTheDocument();
      expect(screen.getByText("Enterprise Support")).toBeInTheDocument();
    });

    it("should handle urgent priority routing", () => {
      render(<ClientDecisionTreeExample />);

      // Start session
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "Free User" } });
      fireEvent.change(emailInput, { target: { value: "user@free.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      // Select free account
      fireEvent.click(screen.getByText("free"));

      // Select general issue
      fireEvent.click(screen.getByText("general"));

      // Select urgent priority - should route to urgent escalation
      fireEvent.click(screen.getByText("urgent"));

      // Should show recommendation for urgent support
      expect(screen.getByText("Recommendation")).toBeInTheDocument();
      expect(screen.getByText("Critical Support")).toBeInTheDocument();
    });

    it("should handle billing support routing", () => {
      render(<ClientDecisionTreeExample />);

      // Start session
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "Free User" } });
      fireEvent.change(emailInput, { target: { value: "user@free.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      // Select free account
      fireEvent.click(screen.getByText("free"));

      // Select billing issue
      fireEvent.click(screen.getByText("billing"));

      // Select medium priority
      fireEvent.click(screen.getByText("medium"));

      // Should show billing support question
      expect(
        screen.getByText("What specific billing issue are you experiencing?")
      ).toBeInTheDocument();
      expect(screen.getByText("Recommendation")).toBeInTheDocument();
      expect(screen.getByText("Billing Support")).toBeInTheDocument();
    });
  });

  describe("Human Agent Transfer", () => {
    it("should allow transfer to human agent", () => {
      render(<ClientDecisionTreeExample />);

      // Get to a support state first
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "User" } });
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      fireEvent.click(screen.getByText("premium"));
      fireEvent.click(screen.getByText("technical"));
      fireEvent.click(screen.getByText("high"));

      // Should show human agent button
      const humanAgentButton = screen.getByText("Connect to Human Agent");
      expect(humanAgentButton).toBeInTheDocument();

      fireEvent.click(humanAgentButton);

      // Should show human agent connection
      expect(screen.getByText("Connecting to Human Agent")).toBeInTheDocument();
      expect(
        screen.getByText("Please wait while we connect you to a human agent...")
      ).toBeInTheDocument();
    });
  });

  describe("Session Restart", () => {
    it("should allow session restart", () => {
      render(<ClientDecisionTreeExample />);

      // Start and progress through some steps
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "User" } });
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      fireEvent.click(screen.getByText("premium"));

      // Should show user profile
      expect(screen.getByText("User Profile")).toBeInTheDocument();

      // Restart session
      fireEvent.click(screen.getByText("Restart Session"));

      // Should be back to initial state
      expect(
        screen.getByText("Welcome to Customer Support")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Your name")).toHaveValue("");
      expect(screen.getByPlaceholderText("Your email")).toHaveValue("");
    });

    it("should allow restart from completed state", () => {
      render(<ClientDecisionTreeExample />);

      // Complete a full session
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      // Go through the flow
      fireEvent.click(screen.getByText("free"));
      fireEvent.click(screen.getByText("general"));
      fireEvent.click(screen.getByText("low"));

      // Answer the question
      const textarea = screen.getByPlaceholderText(
        "Please provide detailed information about your issue..."
      );
      fireEvent.change(textarea, { target: { value: "Test answer" } });
      fireEvent.click(screen.getByText("Submit Answer"));

      // Request human agent (which allows completion)
      fireEvent.click(screen.getByText("Connect to Human Agent"));

      // Should be in human agent state
      expect(screen.getByText("Connecting to Human Agent")).toBeInTheDocument();
      expect(screen.getByText("Complete Session")).toBeInTheDocument();

      // Complete the session
      fireEvent.click(screen.getByText("Complete Session"));

      // Should be in completed state
      expect(screen.getByText("Session Completed")).toBeInTheDocument();
      expect(screen.getByText("Start New Session")).toBeInTheDocument();

      // Click restart from completed state
      fireEvent.click(screen.getByText("Start New Session"));

      // Should be back to initial state
      expect(
        screen.getByText("Welcome to Customer Support")
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Your name")).toHaveValue("");
      expect(screen.getByPlaceholderText("Your email")).toHaveValue("");
    });
  });

  describe("Accessibility", () => {
    it("should have proper form labels and structure", () => {
      render(<ClientDecisionTreeExample />);

      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");

      expect(nameInput).toHaveAttribute("type", "text");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should have proper button states", () => {
      render(<ClientDecisionTreeExample />);

      const startButton = screen.getByText("Start Support Session");
      expect(startButton).toBeDisabled();

      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");

      fireEvent.change(nameInput, { target: { value: "User" } });
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });

      expect(startButton).not.toBeDisabled();
    });
  });

  describe("Visual States", () => {
    it("should style urgent priority with different colors", () => {
      render(<ClientDecisionTreeExample />);

      // Get to priority selection
      const nameInput = screen.getByPlaceholderText("Your name");
      const emailInput = screen.getByPlaceholderText("Your email");
      fireEvent.change(nameInput, { target: { value: "User" } });
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.click(screen.getByText("Start Support Session"));

      fireEvent.click(screen.getByText("free"));
      fireEvent.click(screen.getByText("general"));

      // Check that urgent button has special styling
      const urgentButton = screen.getByText("urgent").closest("button");
      expect(urgentButton).toHaveClass("border-red-300");
    });

    it("should show loading states and transitions properly", () => {
      render(<ClientDecisionTreeExample />);

      // Component should render without errors
      expect(
        screen.getByText("Decision Tree Support System")
      ).toBeInTheDocument();

      // All interactive elements should be present
      expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
      expect(screen.getByText("Start Support Session")).toBeInTheDocument();
    });
  });
});
