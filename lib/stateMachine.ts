import { createMachine } from "xstate";

// Define the states
export const conversationStates = [
  "InitialSetup",
  "SetRegulatoryCheckAtEveryStep",
  "LoanParameters",
  "AcceptanceCriteria",
  "Pricing",
  "RegulatoryCheck",
  "GoLive",
] as const;

export type ConversationState = (typeof conversationStates)[number];

// XState machine definition with NEXT and GOTO transitions (GOTO allows any state to any state)
export const conversationMachine = createMachine({
  id: "conversation",
  initial: "InitialSetup",
  states: {
    InitialSetup: {
      on: {
        NEXT: "SetRegulatoryCheckAtEveryStep",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    SetRegulatoryCheckAtEveryStep: {
      on: {
        NEXT: "LoanParameters",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    LoanParameters: {
      on: {
        NEXT: "AcceptanceCriteria",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    AcceptanceCriteria: {
      on: {
        NEXT: "Pricing",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    Pricing: {
      on: {
        NEXT: "RegulatoryCheck",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    RegulatoryCheck: {
      on: {
        NEXT: "GoLive",
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
    GoLive: {
      type: "final",
      on: {
        GOTO: Object.fromEntries(conversationStates.map((s) => [s, s])),
      },
    },
  },
});

// Singleton interpreter for server-side state
let currentState: ConversationState = "InitialSetup";

export function getCurrentState(): ConversationState {
  return currentState;
}

export function setState(nextState: ConversationState): ConversationState {
  if (conversationStates.includes(nextState)) {
    currentState = nextState;
  }
  return currentState;
}
