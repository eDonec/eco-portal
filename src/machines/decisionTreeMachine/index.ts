import { assign, createMachine } from "xstate";

// Storage key for localStorage
const DECISION_TREE_STORAGE_KEY = "decision-tree-state";

// Exported Types
export type AccountType = "free" | "premium" | "enterprise";
export type IssueType = "technical" | "billing" | "general";
export type Priority = "low" | "medium" | "high" | "urgent";

// Types for the decision tree context and events
export interface DecisionTreeContext {
  userProfile: {
    name: string;
    email: string;
    accountType: AccountType | null;
    issueType: IssueType | null;
    priority: Priority | null;
  };
  responses: Array<{
    question: string;
    answer: string;
    timestamp: Date;
  }>;
  recommendation: {
    department: string;
    estimatedWaitTime: string;
    escalationLevel: number;
    suggestedActions: string[];
  } | null;
  sessionId: string;
}

// Storage functions for persistence
export const saveDecisionTreeDataToStorage = (context: DecisionTreeContext) => {
  if (typeof window !== "undefined") {
    try {
      const dataToSave = {
        context,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        DECISION_TREE_STORAGE_KEY,
        JSON.stringify(dataToSave)
      );
    } catch (error) {
      console.warn("Failed to save decision tree data to localStorage:", error);
    }
  }
};

export const loadDecisionTreeDataFromStorage =
  (): DecisionTreeContext | null => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(DECISION_TREE_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Optional: Add expiration check (e.g., 24 hours)
          const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
          if (!isExpired && parsed.context) {
            // Convert timestamp strings back to Date objects
            if (parsed.context.responses) {
              parsed.context.responses = parsed.context.responses.map(
                (response: {
                  question: string;
                  answer: string;
                  timestamp: string | Date;
                }) => ({
                  ...response,
                  timestamp: new Date(response.timestamp),
                })
              );
            }
            return parsed.context;
          } else {
            // Clean up expired or invalid data
            localStorage.removeItem(DECISION_TREE_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.warn(
          "Failed to load decision tree data from localStorage:",
          error
        );
        // Clean up invalid data
        localStorage.removeItem(DECISION_TREE_STORAGE_KEY);
      }
    }
    return null;
  };

export const clearDecisionTreeDataFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(DECISION_TREE_STORAGE_KEY);
    } catch (error) {
      console.warn(
        "Failed to clear decision tree data from localStorage:",
        error
      );
    }
  }
};

// Helper function to determine the correct state based on context
export const getStateFromContext = (context: DecisionTreeContext): string => {
  // If no session started, stay in idle
  if (!context.sessionId || !context.userProfile.name) {
    return "idle";
  }

  // If we have a recommendation, determine which recommendation state
  if (context.recommendation) {
    // Check account type and issue combinations to determine the correct end state
    const { accountType, issueType, priority } = context.userProfile;

    if (accountType === "enterprise") {
      return "enterpriseSupport";
    }

    if (priority === "urgent") {
      return "urgentEscalation";
    }

    if (accountType === "premium" && issueType === "technical") {
      return "premiumTechnical.techQuestions";
    }

    if (issueType === "billing") {
      return "billingSupport.billingQuestions";
    }

    return "generalTriage.additionalQuestions";
  }

  // If user profile is partially filled, determine where we are in collection
  const { accountType, issueType, priority } = context.userProfile;

  if (!accountType) {
    return "collectingUserInfo.accountType";
  }

  if (!issueType) {
    return "collectingUserInfo.issueType";
  }

  if (!priority) {
    return "collectingUserInfo.priority";
  }

  // If all user info is collected but no recommendation, go to processing
  return "processing";
};

export type DecisionTreeEvent =
  | { type: "START"; userInfo: { name: string; email: string } }
  | { type: "SELECT_ACCOUNT_TYPE"; accountType: AccountType }
  | { type: "SELECT_ISSUE_TYPE"; issueType: IssueType }
  | { type: "SELECT_PRIORITY"; priority: Priority }
  | { type: "ANSWER_QUESTION"; question: string; answer: string }
  | { type: "REQUEST_HUMAN_AGENT" }
  | { type: "RESTART" }
  | { type: "COMPLETE" };

// Helper functions for decision logic
const determineRoutingPath = (context: DecisionTreeContext): string => {
  const { accountType, issueType, priority } = context.userProfile;

  // Enterprise customers get priority routing
  if (accountType === "enterprise") {
    return "enterpriseRoute";
  }

  // Urgent issues bypass normal flow
  if (priority === "urgent") {
    return "urgentRoute";
  }

  // Technical issues for premium customers
  if (accountType === "premium" && issueType === "technical") {
    return "premiumTechnicalRoute";
  }

  // Billing issues get special handling
  if (issueType === "billing") {
    return "billingRoute";
  }

  // Default to general support
  return "generalRoute";
};

const generateRecommendation = (context: DecisionTreeContext) => {
  const route = determineRoutingPath(context);

  const recommendations = {
    enterpriseRoute: {
      department: "Enterprise Support",
      estimatedWaitTime: "< 5 minutes",
      escalationLevel: 3,
      suggestedActions: [
        "Dedicated account manager will be contacted",
        "Priority queue placement",
        "Screen sharing session available",
      ],
    },
    urgentRoute: {
      department: "Critical Support",
      estimatedWaitTime: "< 2 minutes",
      escalationLevel: 4,
      suggestedActions: [
        "Immediate escalation to senior technician",
        "Emergency response protocol activated",
        "Phone call backup initiated",
      ],
    },
    premiumTechnicalRoute: {
      department: "Premium Technical Support",
      estimatedWaitTime: "5-10 minutes",
      escalationLevel: 2,
      suggestedActions: [
        "Technical specialist assignment",
        "Advanced troubleshooting tools provided",
        "Follow-up documentation included",
      ],
    },
    billingRoute: {
      department: "Billing Support",
      estimatedWaitTime: "10-15 minutes",
      escalationLevel: 1,
      suggestedActions: [
        "Account review initiated",
        "Payment history analysis",
        "Refund eligibility check",
      ],
    },
    generalRoute: {
      department: "General Support",
      estimatedWaitTime: "15-25 minutes",
      escalationLevel: 1,
      suggestedActions: [
        "Standard support queue",
        "FAQ and documentation provided",
        "Community forum access",
      ],
    },
  };

  return recommendations[route as keyof typeof recommendations];
};

// Decision Tree State Machine
export const decisionTreeMachine = createMachine(
  {
    id: "decisionTree",
    initial: "idle",
    context: {
      userProfile: {
        name: "",
        email: "",
        accountType: null,
        issueType: null,
        priority: null,
      },
      responses: [],
      recommendation: null,
      sessionId: "",
    } as DecisionTreeContext,

    types: {} as {
      context: DecisionTreeContext;
      events: DecisionTreeEvent;
    },

    states: {
      idle: {
        entry: "loadFromStorage",
        always: [
          {
            guard: "hasSavedData",
            target: "restoring",
          },
        ],
        on: {
          START: {
            target: "collectingUserInfo",
            actions: ["setUserInfo", "addStartResponse", "saveToStorage"],
          },
        },
      },

      restoring: {
        always: [
          {
            guard: "shouldGoToEnterpriseSupport",
            target: "enterpriseSupport",
          },
          {
            guard: "shouldGoToUrgentEscalation",
            target: "urgentEscalation",
          },
          {
            guard: "shouldGoToPremiumTechnical",
            target: "premiumTechnical.techQuestions",
          },
          {
            guard: "shouldGoToBillingSupport",
            target: "billingSupport.billingQuestions",
          },
          {
            guard: "shouldGoToGeneralTriage",
            target: "generalTriage.additionalQuestions",
          },
          {
            guard: "shouldGoToProcessing",
            target: "processing",
          },
          {
            guard: "shouldGoToAccountType",
            target: "collectingUserInfo.accountType",
          },
          {
            guard: "shouldGoToIssueType",
            target: "collectingUserInfo.issueType",
          },
          {
            guard: "shouldGoToPriority",
            target: "collectingUserInfo.priority",
          },
          // Default fallback
          {
            target: "idle",
          },
        ],
      },

      collectingUserInfo: {
        initial: "accountType",
        states: {
          accountType: {
            on: {
              SELECT_ACCOUNT_TYPE: {
                target: "issueType",
                actions: [
                  "setAccountType",
                  "addAccountTypeResponse",
                  "saveToStorage",
                ],
              },
            },
          },

          issueType: {
            on: {
              SELECT_ISSUE_TYPE: {
                target: "priority",
                actions: [
                  "setIssueType",
                  "addIssueTypeResponse",
                  "saveToStorage",
                ],
              },
            },
          },

          priority: {
            on: {
              SELECT_PRIORITY: {
                target: "#decisionTree.processing",
                actions: [
                  "setPriority",
                  "addPriorityResponse",
                  "saveToStorage",
                ],
              },
            },
          },
        },
      },

      processing: {
        always: [
          // Enterprise customers go straight to enterprise support
          {
            guard: "isEnterpriseCustomer",
            target: "enterpriseSupport",
          },
          // Urgent issues get immediate escalation
          {
            guard: "isUrgentIssue",
            target: "urgentEscalation",
          },
          // Technical issues for premium users
          {
            guard: "isPremiumTechnical",
            target: "premiumTechnical",
          },
          // Billing issues get specialized handling
          {
            guard: "isBillingIssue",
            target: "billingSupport",
          },
          // Default to general support with additional questions
          {
            target: "generalTriage",
          },
        ],
      },

      enterpriseSupport: {
        entry: "generateRecommendation",
        on: {
          COMPLETE: "completed",
          REQUEST_HUMAN_AGENT: "humanAgent",
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      urgentEscalation: {
        entry: "generateUrgentRecommendation",
        on: {
          COMPLETE: "completed",
          REQUEST_HUMAN_AGENT: "humanAgent",
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      premiumTechnical: {
        entry: "generateRecommendation",
        initial: "techQuestions",
        states: {
          techQuestions: {
            on: {
              ANSWER_QUESTION: {
                actions: ["addQuestionResponse", "saveToStorage"],
              },
              COMPLETE: "#decisionTree.completed",
              REQUEST_HUMAN_AGENT: "#decisionTree.humanAgent",
            },
          },
        },
        on: {
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      billingSupport: {
        entry: "generateRecommendation",
        initial: "billingQuestions",
        states: {
          billingQuestions: {
            on: {
              ANSWER_QUESTION: {
                actions: ["addQuestionResponse", "saveToStorage"],
              },
              COMPLETE: "#decisionTree.completed",
              REQUEST_HUMAN_AGENT: "#decisionTree.humanAgent",
            },
          },
        },
        on: {
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      generalTriage: {
        entry: "generateRecommendation",
        initial: "additionalQuestions",
        states: {
          additionalQuestions: {
            on: {
              ANSWER_QUESTION: [
                {
                  // If user mentions keywords that indicate higher priority
                  guard: "containsUrgentKeywords",
                  target: "#decisionTree.urgentEscalation",
                  actions: ["addQuestionResponse", "saveToStorage"],
                },
                {
                  actions: ["addQuestionResponse", "saveToStorage"],
                },
              ],
              COMPLETE: "#decisionTree.completed",
              REQUEST_HUMAN_AGENT: "#decisionTree.humanAgent",
            },
          },
        },
        on: {
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      humanAgent: {
        entry: "generateHumanAgentRecommendation",
        on: {
          COMPLETE: "completed",
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },

      completed: {
        entry: ["addCompletionResponse", "saveToStorage"],
        on: {
          RESTART: {
            target: "#decisionTree.idle",
            actions: ["resetMachine", "clearStorage"],
          },
        },
      },
    },

    on: {
      RESTART: {
        target: "#decisionTree.idle",
        actions: ["resetMachine", "clearStorage"],
      },
    },
  },
  {
    actions: {
      setUserInfo: assign({
        userProfile: ({ context, event }) => {
          if (event.type !== "START") return context.userProfile;
          return {
            ...context.userProfile,
            name: event.userInfo.name,
            email: event.userInfo.email,
          };
        },
        sessionId: () =>
          `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }),

      addStartResponse: assign({
        responses: ({ context, event }) => {
          if (event.type !== "START") return context.responses;
          return [
            ...context.responses,
            {
              question: "What is your name and email?",
              answer: `${event.userInfo.name} (${event.userInfo.email})`,
              timestamp: new Date(),
            },
          ];
        },
      }),

      setAccountType: assign({
        userProfile: ({ context, event }) => {
          if (event.type !== "SELECT_ACCOUNT_TYPE") return context.userProfile;
          return {
            ...context.userProfile,
            accountType: event.accountType,
          };
        },
      }),

      addAccountTypeResponse: assign({
        responses: ({ context, event }) => {
          if (event.type !== "SELECT_ACCOUNT_TYPE") return context.responses;
          return [
            ...context.responses,
            {
              question: "What type of account do you have?",
              answer: event.accountType,
              timestamp: new Date(),
            },
          ];
        },
      }),

      setIssueType: assign({
        userProfile: ({ context, event }) => {
          if (event.type !== "SELECT_ISSUE_TYPE") return context.userProfile;
          return {
            ...context.userProfile,
            issueType: event.issueType,
          };
        },
      }),

      addIssueTypeResponse: assign({
        responses: ({ context, event }) => {
          if (event.type !== "SELECT_ISSUE_TYPE") return context.responses;
          return [
            ...context.responses,
            {
              question: "What type of issue are you experiencing?",
              answer: event.issueType,
              timestamp: new Date(),
            },
          ];
        },
      }),

      setPriority: assign({
        userProfile: ({ context, event }) => {
          if (event.type !== "SELECT_PRIORITY") return context.userProfile;
          return {
            ...context.userProfile,
            priority: event.priority,
          };
        },
      }),

      addPriorityResponse: assign({
        responses: ({ context, event }) => {
          if (event.type !== "SELECT_PRIORITY") return context.responses;
          return [
            ...context.responses,
            {
              question: "How urgent is this issue?",
              answer: event.priority,
              timestamp: new Date(),
            },
          ];
        },
      }),

      addQuestionResponse: assign({
        responses: ({ context, event }) => {
          if (event.type !== "ANSWER_QUESTION") return context.responses;
          return [
            ...context.responses,
            {
              question: event.question,
              answer: event.answer,
              timestamp: new Date(),
            },
          ];
        },
      }),

      generateRecommendation: assign({
        recommendation: ({ context }) => generateRecommendation(context),
      }),

      generateUrgentRecommendation: assign({
        recommendation: () => ({
          department: "Critical Support",
          estimatedWaitTime: "< 2 minutes",
          escalationLevel: 4,
          suggestedActions: [
            "Immediate escalation to senior technician",
            "Emergency response protocol activated",
            "Phone call backup initiated",
          ],
        }),
      }),

      generateHumanAgentRecommendation: assign({
        recommendation: ({ context }) => ({
          ...generateRecommendation(context),
          department: "Human Agent Transfer",
          estimatedWaitTime: "Connecting...",
          escalationLevel: context.recommendation?.escalationLevel || 1,
          suggestedActions: [
            "Connecting to human agent",
            "Session history will be transferred",
            "Previous responses have been logged",
          ],
        }),
      }),

      addCompletionResponse: assign({
        responses: ({ context }) => [
          ...context.responses,
          {
            question: "Session status",
            answer: "Completed successfully",
            timestamp: new Date(),
          },
        ],
      }),

      resetMachine: assign({
        userProfile: {
          name: "",
          email: "",
          accountType: null,
          issueType: null,
          priority: null,
        },
        responses: [],
        recommendation: null,
        sessionId: "",
      }),

      // Storage actions
      saveToStorage: ({ context }) => {
        saveDecisionTreeDataToStorage(context);
      },

      loadFromStorage: assign(() => {
        const savedData = loadDecisionTreeDataFromStorage();
        return savedData || {};
      }),

      clearStorage: () => {
        clearDecisionTreeDataFromStorage();
      },
    },

    guards: {
      isEnterpriseCustomer: ({ context }) =>
        context.userProfile.accountType === "enterprise",
      isUrgentIssue: ({ context }) => context.userProfile.priority === "urgent",
      isPremiumTechnical: ({ context }) =>
        context.userProfile.accountType === "premium" &&
        context.userProfile.issueType === "technical",
      isBillingIssue: ({ context }) =>
        context.userProfile.issueType === "billing",
      containsUrgentKeywords: ({ event }) => {
        if (event.type !== "ANSWER_QUESTION") return false;
        const urgentKeywords = [
          "down",
          "broken",
          "urgent",
          "critical",
          "production",
        ];
        return urgentKeywords.some((keyword) =>
          event.answer.toLowerCase().includes(keyword)
        );
      },

      // Guards for state restoration
      hasSavedData: ({ context }) => {
        return !!(context.sessionId && context.userProfile.name);
      },

      shouldGoToEnterpriseSupport: ({ context }) => {
        return !!(
          context.recommendation &&
          context.userProfile.accountType === "enterprise"
        );
      },

      shouldGoToUrgentEscalation: ({ context }) => {
        return !!(
          context.recommendation && context.userProfile.priority === "urgent"
        );
      },

      shouldGoToPremiumTechnical: ({ context }) => {
        return !!(
          context.recommendation &&
          context.userProfile.accountType === "premium" &&
          context.userProfile.issueType === "technical"
        );
      },

      shouldGoToBillingSupport: ({ context }) => {
        return !!(
          context.recommendation && context.userProfile.issueType === "billing"
        );
      },

      shouldGoToGeneralTriage: ({ context }) => {
        return !!(
          context.recommendation &&
          !(context.userProfile.accountType === "enterprise") &&
          !(context.userProfile.priority === "urgent") &&
          !(
            context.userProfile.accountType === "premium" &&
            context.userProfile.issueType === "technical"
          ) &&
          !(context.userProfile.issueType === "billing")
        );
      },

      shouldGoToProcessing: ({ context }) => {
        return !!(
          context.userProfile.accountType &&
          context.userProfile.issueType &&
          context.userProfile.priority &&
          !context.recommendation
        );
      },

      shouldGoToAccountType: ({ context }) => {
        return !!(
          context.sessionId &&
          context.userProfile.name &&
          !context.userProfile.accountType
        );
      },

      shouldGoToIssueType: ({ context }) => {
        return !!(
          context.userProfile.accountType && !context.userProfile.issueType
        );
      },

      shouldGoToPriority: ({ context }) => {
        return !!(
          context.userProfile.accountType &&
          context.userProfile.issueType &&
          !context.userProfile.priority
        );
      },
    },
  }
);

// Helper function to get current question based on state
export const getCurrentQuestion = (state: string): string => {
  switch (state) {
    case "collectingUserInfo.accountType":
      return "What type of account do you have?";
    case "collectingUserInfo.issueType":
      return "What type of issue are you experiencing?";
    case "collectingUserInfo.priority":
      return "How urgent is this issue?";
    case "premiumTechnical.techQuestions":
      return "Can you describe the technical issue in more detail?";
    case "billingSupport.billingQuestions":
      return "What specific billing issue are you experiencing?";
    case "generalTriage.additionalQuestions":
      return "Can you provide more details about your issue?";
    default:
      return "";
  }
};

// Helper function to get available options
export const getAvailableOptions = (state: string): string[] => {
  switch (state) {
    case "collectingUserInfo.accountType":
      return ["free", "premium", "enterprise"];
    case "collectingUserInfo.issueType":
      return ["technical", "billing", "general"];
    case "collectingUserInfo.priority":
      return ["low", "medium", "high", "urgent"];
    default:
      return [];
  }
};
