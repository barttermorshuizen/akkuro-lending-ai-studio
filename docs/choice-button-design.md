# Choice Button Interaction Design

This document specifies how the LLM can suggest choices and how the client will render them as buttons in the chat UI.

## 1. Overview

- When the LLM wants to present a set of predefined options, it will include a `choices` array in its response payload.
- The client will detect that payload, render a button for each choice, and allow the user to click a button to populate the input field.
- The user may also freely type their own response.

## 2. LLM Response Format

When offering choices, the LLM emits a JSON object with two properties:

```json
{
  "text": "Which audience should we target?",
  "choices": [
    "SMEs",
    "Corporate",
    "Consumers",
    "Projects"
  ]
}
```

- `text`      → The assistant message to display.
- `choices[]` → An array of strings, each rendered as a button.

## 3. Client Parsing & State

### Store Shape

Extend the conversation item type to include optional `choices`:

```ts
export interface ChoiceMessage {
  role: "assistant";
  text: string;
  choices?: string[];
}
```

### SSE Handling (`lib/assistant.ts`)

1. On receiving a complete SSE event (`response.completed`), check if the message content can be parsed into `{ text, choices }`.
2. If a `choices` array exists, push into the state:

   ```ts
   conversationItems.push({
     role: "assistant",
     text: parsed.text,
     choices: parsed.choices
   });
   ```

## 4. UI Components

### `ChoicePanel`

A new component below each message:

```tsx
type ChoicePanelProps = {
  choices: string[];
  onSelect: (choice: string) => void;
};

function ChoicePanel({ choices, onSelect }: ChoicePanelProps) {
  return (
    <div className="choice-panel">
      {choices.map(choice => (
        <button key={choice} onClick={() => onSelect(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}
```

### `ChatInput`

- When a button is clicked, call `onSelect(choice)`:
  ```ts
  function onSelect(choice: string) {
    setInputValue(choice);
    focusInput();
  }
  ```

## 5. Interaction Flow

```mermaid
flowchart TD
  subgraph LLM
    A[User message] --> B{LLM offers choices?}
    B -->|Yes| C[Emit {"text", "choices"}]
    B -->|No| D[Emit normal message]
  end

  subgraph Client
    C --> E[Detect choices field]
    E --> F[Update store with {text, choices}]
    F --> G[Render chat bubble]
    G --> H[Render ChoicePanel below bubble]
    H --> I[User clicks a button]
    I --> J[Populate input field with choice]
  end

  subgraph Next
    J --> K[User presses Send]
    K --> L[New LLM turn with previous context]
  end
```

## 6. Next Steps

1. Update `config/stateInstructions.ts` so that choice prompts include a `choices` array.
2. Modify `lib/assistant.ts` SSE handler to detect and store `choices`.
3. Create the `ChoicePanel` component.
4. Wire `onSelect` to the input component.
5. Test end-to-end flow.