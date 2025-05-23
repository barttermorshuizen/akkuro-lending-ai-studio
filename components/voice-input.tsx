"use client";

import React, { HTMLAttributes } from "react";

interface VoiceInputProps {
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
  listening: boolean;
}

const VoiceInput = ({ onClick, listening }: VoiceInputProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full p-2 transition-colors shadow-md ${
        listening ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
      } ${listening ? "voice-bubble" : ""}`}
      title={listening ? "Stop recording" : "Start recording"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scale-75"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
};

export default VoiceInput;
