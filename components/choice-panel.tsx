"use client";

import React from "react";

type ChoicePanelProps = {
  choices: string[];
  onSelect: (choice: string) => void;
};

const ChoicePanel: React.FC<ChoicePanelProps> = ({ choices, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => onSelect(choice)}
          className="px-4 py-2 text-sm font-medium rounded-[16px] bg-white border border-stone-200 text-black hover:bg-stone-100 transition-colors shadow-sm"
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default ChoicePanel;