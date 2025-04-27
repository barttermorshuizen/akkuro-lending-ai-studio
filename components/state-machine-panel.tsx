"use client";

import React from "react";
import useConversationStore from "@/stores/useConversationStore";

export default function StateMachinePanel() {
  const {
    conversationStates,
    conversationState,
    setConversationState,
  } = useConversationStore();

  return (
    <div className="p-4 border rounded mb-4 bg-white">
      <h2 className="font-medium mb-2">Conversation State</h2>
      <div className="flex flex-wrap gap-2">
        {conversationStates.map((state) => (
          <button
            key={state}
            className={`px-3 py-1 rounded ${
              state === conversationState
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setConversationState(state)}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
