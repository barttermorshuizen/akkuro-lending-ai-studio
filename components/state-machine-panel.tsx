"use client";

import React, { useEffect } from "react";
import useConversationStore from "@/stores/useConversationStore";

export default function StateMachinePanel() {
  const {
    conversationStates,
    conversationState,
    setConversationState,
  } = useConversationStore();

  // Fetch current state from API on mount
  useEffect(() => {
    fetch("/api/state/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.state && data.state !== conversationState) {
          setConversationState(data.state);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update state via API when user clicks a state button
  const handleStateChange = (state: string) => {
    fetch("/api/state/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nextState: state }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.state) {
          setConversationState(data.state);
        }
      });
  };

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
            onClick={() => handleStateChange(state)}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
