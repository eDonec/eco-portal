"use client";

import { useMachine } from "@xstate/react";
import React, { useState } from "react";
import {
  decisionTreeMachine,
  getAvailableOptions,
  getCurrentQuestion,
  type AccountType,
  type IssueType,
  type Priority,
} from "../../../machines/decisionTreeMachine";

const ClientDecisionTreeExample: React.FC = () => {
  const [state, send] = useMachine(decisionTreeMachine);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [currentAnswer, setCurrentAnswer] = useState("");

  const { context, value } = state;
  const currentStateString =
    typeof value === "string" ? value : Object.keys(value)[0];
  const isCollecting =
    typeof value === "object" && "collectingUserInfo" in value;
  const currentSubState = isCollecting
    ? (value as { collectingUserInfo: string }).collectingUserInfo
    : null;

  // Construct full state path for nested states
  let fullState = currentStateString;
  if (currentSubState) {
    fullState = `collectingUserInfo.${currentSubState}`;
  } else if (typeof value === "object" && currentStateString) {
    // Handle nested states like { premiumTechnical: "techQuestions" }
    const nestedState = (value as Record<string, string>)[currentStateString];
    if (typeof nestedState === "string") {
      fullState = `${currentStateString}.${nestedState}`;
    }
  }

  const handleStart = () => {
    if (userInfo.name && userInfo.email) {
      send({
        type: "START",
        userInfo: { name: userInfo.name, email: userInfo.email },
      });
    }
  };

  const handleAccountTypeSelect = (accountType: AccountType) => {
    send({ type: "SELECT_ACCOUNT_TYPE", accountType });
  };

  const handleIssueTypeSelect = (issueType: IssueType) => {
    send({ type: "SELECT_ISSUE_TYPE", issueType });
  };

  const handlePrioritySelect = (priority: Priority) => {
    send({ type: "SELECT_PRIORITY", priority });
  };

  const handleAnswerQuestion = () => {
    if (currentAnswer.trim()) {
      const currentQuestion = getCurrentQuestion(fullState);
      send({
        type: "ANSWER_QUESTION",
        question: currentQuestion,
        answer: currentAnswer,
      });
      setCurrentAnswer("");
    }
  };

  const handleRequestHuman = () => {
    send({ type: "REQUEST_HUMAN_AGENT" });
  };

  const handleComplete = () => {
    send({ type: "COMPLETE" });
  };

  const handleRestart = () => {
    send({ type: "RESTART" });
    setUserInfo({ name: "", email: "" });
    setCurrentAnswer("");
  };

  const renderCurrentStep = () => {
    if (currentStateString === "idle") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Welcome to Customer Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please provide your information to get started:
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <input
              type="email"
              placeholder="Your email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleStart}
              disabled={!userInfo.name || !userInfo.email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                         text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Start Support Session
            </button>
          </div>
        </div>
      );
    }

    if (currentSubState === "accountType") {
      const options = getAvailableOptions(fullState) as AccountType[];
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {getCurrentQuestion(fullState)}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAccountTypeSelect(option)}
                className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <span className="font-medium capitalize">{option}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {option === "free" &&
                    "Basic support with community resources"}
                  {option === "premium" &&
                    "Priority support with faster response times"}
                  {option === "enterprise" &&
                    "Dedicated support with SLA guarantees"}
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentSubState === "issueType") {
      const options = getAvailableOptions(fullState) as IssueType[];
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {getCurrentQuestion(fullState)}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleIssueTypeSelect(option)}
                className="p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <span className="font-medium capitalize">{option}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {option === "technical" &&
                    "Software bugs, performance issues, integrations"}
                  {option === "billing" &&
                    "Payment, subscriptions, invoicing questions"}
                  {option === "general" &&
                    "Account settings, features, how-to questions"}
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (currentSubState === "priority") {
      const options = getAvailableOptions(fullState) as Priority[];
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {getCurrentQuestion(fullState)}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handlePrioritySelect(option)}
                className={`p-4 text-left border rounded-lg transition-colors
                           ${
                             option === "urgent"
                               ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                               : option === "high"
                               ? "border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                               : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                           } text-gray-900 dark:text-gray-100`}
              >
                <span className="font-medium capitalize">{option}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {option === "low" && "Can wait, no immediate impact"}
                  {option === "medium" && "Some impact on daily operations"}
                  {option === "high" && "Significant impact, needs attention"}
                  {option === "urgent" &&
                    "Critical issue, immediate help needed"}
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Handle specialized support states
    if (
      currentStateString === "enterpriseSupport" ||
      currentStateString === "urgentEscalation" ||
      (typeof value === "object" &&
        ("premiumTechnical" in value ||
          "billingSupport" in value ||
          "generalTriage" in value))
    ) {
      const currentQuestion = getCurrentQuestion(fullState);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {currentQuestion}
          </h3>
          <div className="space-y-3">
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Please provide detailed information about your issue..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         min-h-[120px] resize-vertical"
            />
            <div className="flex gap-3">
              <button
                onClick={handleAnswerQuestion}
                disabled={!currentAnswer.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Submit Answer
              </button>
              <button
                onClick={handleRequestHuman}
                className="bg-green-600 hover:bg-green-700 text-white font-medium 
                           py-2 px-4 rounded-lg transition-colors"
              >
                Connect to Human Agent
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentStateString === "humanAgent") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
            Connecting to Human Agent
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we connect you to a human agent...
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleComplete}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium 
                         py-2 px-4 rounded-lg transition-colors"
            >
              Complete Session
            </button>
          </div>
        </div>
      );
    }

    if (currentStateString === "completed") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
            Session Completed
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for using our support system. Your session has been
            completed.
          </p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium 
                       py-2 px-4 rounded-lg transition-colors"
          >
            Start New Session
          </button>
        </div>
      );
    }

    return (
      <div className="text-gray-600 dark:text-gray-400">
        Current state: {JSON.stringify(value)}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Decision Tree Support System
          </h1>
          <p className="text-blue-100">
            Intelligent customer support routing with XState
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - User Profile & Session History */}
            <div className="space-y-6">
              {/* User Profile */}
              {context.userProfile.name && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    User Profile
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Name:</strong> {context.userProfile.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {context.userProfile.email}
                    </p>
                    {context.userProfile.accountType && (
                      <p>
                        <strong>Account:</strong>{" "}
                        {context.userProfile.accountType}
                      </p>
                    )}
                    {context.userProfile.issueType && (
                      <p>
                        <strong>Issue:</strong> {context.userProfile.issueType}
                      </p>
                    )}
                    {context.userProfile.priority && (
                      <p>
                        <strong>Priority:</strong>{" "}
                        {context.userProfile.priority}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Session History */}
              {context.responses.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Session History
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {context.responses.map((response, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Q: {response.question}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 ml-2">
                          A: {response.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Form Container */}
            <div className="lg:col-span-2">{renderCurrentStep()}</div>

            {/* Right Sidebar - Recommendation & Controls */}
            <div className="space-y-6">
              {/* Recommendation */}
              {context.recommendation && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Recommendation
                  </h4>
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <p>
                      <strong>Department:</strong>{" "}
                      {context.recommendation.department}
                    </p>
                    <p>
                      <strong>Wait Time:</strong>{" "}
                      {context.recommendation.estimatedWaitTime}
                    </p>
                    <p>
                      <strong>Escalation Level:</strong>{" "}
                      {context.recommendation.escalationLevel}
                    </p>
                    {context.recommendation.suggestedActions.length > 0 && (
                      <div>
                        <strong>Suggested Actions:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {context.recommendation.suggestedActions.map(
                            (action, index) => (
                              <li key={index}>{action}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Controls
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={handleRestart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium 
                               py-2 px-4 rounded-lg transition-colors"
                  >
                    Restart Session
                  </button>
                  {context.sessionId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Session ID: {context.sessionId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDecisionTreeExample;
