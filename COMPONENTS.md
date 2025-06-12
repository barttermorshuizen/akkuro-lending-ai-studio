# Component Documentation

## Overview

This document provides detailed information about the React components used in the Akkuro Lending AI Studio application. The component architecture follows a modular design with clear separation of concerns between UI components, business logic, and state management.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Core Components](#core-components)
- [UI Components](#ui-components)
- [Screen Components](#screen-components)
- [Tool Components](#tool-components)
- [State Integration](#state-integration)
- [Component Guidelines](#component-guidelines)
- [Testing Components](#testing-components)

## Architecture Overview

### Component Hierarchy

```
App Layout (app/layout.tsx)
├── Header (app/components/header.tsx)
└── Main Content
    ├── Main Landing Page (app/page.tsx)
    │   ├── Chat Interface (./chat.tsx)
    │   ├── Product Preview (./product-preview/*.ts,.tsx)
    │   ├── Tools Panel (./tools-panel.tsx)
    ├── Studio Interface (app/studio/page.tsx)
    └── Login Interface (app/login/page.tsx)
```

### Design Principles

- **Composition over Inheritance**: Components are built using composition patterns
- **Single Responsibility**: Each component has a clear, focused purpose
- **Props Interface**: Well-defined TypeScript interfaces for all props
- **State Isolation**: Components manage their own local state when appropriate
- **Accessibility**: All components include proper ARIA labels and keyboard navigation

## Core Components

### Chat System

#### Chat Component (`components/chat.tsx`)

The main chat interface that orchestrates the conversation flow.

**Props Interface:**

```typescript
interface ChatProps {
  items: Item[];
  onSendMessage: (message: string) => void;
}
```

**Key Features:**

- Conversation
- Streaming response handling
- Tool call integration
- Voice input/output
- Auto-scrolling to latest messages

**Usage:**

```tsx
import Chat from "@/components/chat";
<Chat items={chatMessages} onSendMessage={handleSendMessage} />;
```

**State Dependencies (Store with Zustand):**

- `useConversationStore` - Chat history and state
- `useToolsStore` - Available tools and configuration
- `useTextToVoiceToggleStore` - Voice output preferences
- `useAudioCacheStore` - Caching the text to voice response, avoid unncessary api call to save cost
- `useAuthStore` - Persist auth state to store user information
- `useComplianceCheckStore` - Store Compliance check information
- `useConfiguringProductStore` - Store the product that is displayed in product preview section and control its display state
- `useRegulatoryCheck` - Control the regulatory check options (`each step` OR `at the end`)
- `useSimulationProductPopupStore` - Control the popup to simulate product (`deprecated`, no longer included in current version)
- `useTextToVoiceToggleStore` - Control the text to voice feature on or off
- `useToolsStore` - Manage tools: Functions, Web Search, File Search, Options to display in Chat...

**Custom Hooks:**
To avoid too much logic is displayed in the UI Components

- `useChat`: Manage the conversation
  /\*\*
  - Custom hook to manage the chat conversation
  - @param onSendMessage - Function to send message to the assistant
  - @param items - Array of chat items
  - @param listening - Whether the user is listening to the microphone
  - @param resetTranscript - Function to reset the transcript
  - @param transcript - The transcript of the user's voice input
  - @returns Object containing the following properties:
  - - itemsEndRef: Ref to the end of the items container
  - - textareaRef: Ref to the textarea element
  - - isComposing: Whether the user is composing a message
  - - handleVoiceTranscript: Function to handle voice transcript
  - - handleKeyDown: Function to handle key down event
  - - setIsComposing: Function to set the composing state
  - - resetMessage: Function to reset the message
      \*/
- `useExtractProductPreviewInfoByState`: return displayed fields by state.

---

#### Message Component (`components/message.tsx`)

Renders individual chat messages with proper formatting and annotations.

**Props Interface:**

```typescript
interface MessageProps {
  message: {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
    annotations?: Annotation[];
  };
  showTimestamp?: boolean;
  className?: string;
}
```

**Features:**

- Markdown rendering
- Code syntax highlighting
- Annotation display
- Role-based styling
- Timestamp formatting

**Usage:**

```tsx
<Message message={message} showTimestamp={true} className="mb-4" />
```

---

#### Tool Call Component (`components/tool-call.tsx`)

Displays tool execution status and results.

**Props Interface:**

```typescript
interface ToolCallProps {
  toolCall: {
    type: "tool_call";
    tool_type: "file_search_call" | "web_search_call" | "function_call";
    status: "in_progress" | "completed" | "failed" | "searching";
    id: string;
    name?: string | null;
    call_id?: string;
    arguments?: string;
    parsedArguments?: any;
    output?: string | null;
    sendAt?: Date;
  };
}
```

**Features:**

- Real-time status updates
- Error handling and retry
- Result visualization
- Progress indicators

---

#### Annotations Component (`components/annotations.tsx`)

Renders message annotations like citations and references.

**Props Interface:**

```typescript
interface AnnotationsProps {
  annotations: {
    type: "file_citation" | "url_citation";
    fileId?: string;
    url?: string;
    title?: string;
    filename?: string;
    index?: number;
  }[];
  className?: string;
}
```

### Voice Interface

#### Voice Input Component (`components/voice-input.tsx`)

Handles speech recognition for voice commands.

**Props Interface:**

```typescript
interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
  className?: string;
}
```

**Features:**

- Speech recognition integration
- Visual feedback for listening state
- Error handling for unsupported browsers
- Continuous and single-shot modes

**Browser Support:**

- Chrome/Edge: Full support
- Firefox: Limited support
- Safari: Requires user gesture

---

#### Text-to-Speech Component (`components/text-to-speech.tsx`)

Converts text responses to speech output.

**Props Interface:**

```typescript
interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  isFinal?: boolean;
}
```

**Features:**

- OpenAI TTS integration
- Multiple voice options
- Audio caching
- Playback controls

### Configuration Components

#### Tools Panel Component (`components/tools-panel.tsx`)

Configuration interface for AI tools and settings.

**Props Interface:**

```typescript
interface ToolsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**

- Tool enable/disable toggles
- Configuration options
- Real-time preview
- Settings persistence

---

#### State Machine Panel Component (`components/state-machine-panel.tsx`)

Visualizes and controls the application state machine.

**Props Interface:**

```typescript
interface StateMachinePanelProps {
  currentState: string;
  availableTransitions: string[];
  onTransition: (transition: string) => void;
}
```

**Features:**

- State visualization
- Transition controls
- State history
- Debug information

### File Management

#### File Upload Component (`components/file-upload.tsx`)

Handles file uploads for vector store integration.

**Props Interface:**

```typescript
interface FileUploadProps {
  onUpload: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
}
```

**Features:**

- Drag and drop interface
- File type validation
- Size limit enforcement
- Progress tracking
- Error handling

**Supported File Types:**

- PDF documents
- Text files (.txt, .md)
- Word documents (.docx)
- Images (.jpg, .png, .gif)

---

#### File Search Setup Component (`components/file-search-setup.tsx`)

Configuration interface for vector store setup.

**Props Interface:**

```typescript
interface FileSearchSetupProps {
  vectorStores: VectorStore[];
  onCreateStore: (name: string, files: string[]) => void;
  onDeleteStore: (storeId: string) => void;
}
```

## UI Components

The application uses a combination of custom components and Radix UI primitives for consistent design.

### Base UI Components (`components/ui/`)

#### Button Component

```typescript
interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

#### Dialog Component

```typescript
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}
```

#### Input Component

```typescript
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
```

### Specialized UI Components

#### Country Selector (`components/country-selector.tsx`)

International country selection with search and flags.

**Features:**

- Search functionality
- Flag icons
- Keyboard navigation
- Country code support

#### Carousel Screens (`components/carousel-screens.tsx`)

Navigation component for multi-step processes.

**Features:**

- Step indicators
- Progress tracking
- Navigation controls
- Responsive design

## Screen Components

Screen components represent full-page interfaces for specific workflows.

### Product Configuration Screens (`components/screens/`)

#### Product Screen Component (`components/product-screen.tsx`)

Main interface for product configuration workflow.

**Props Interface:**

```typescript
interface ProductScreenProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}
```

**Workflow Steps:**

1. Initial Setup
2. Loan Parameters
3. Pricing Configuration
4. Regulatory Checks
5. Acceptance Criteria
6. Go Live Process

### Conditional Components (`components/condition/`)

Components that render based on specific conditions or states.

#### Features:

- State-based rendering
- Conditional logic
- Dynamic content
- Performance optimization

## Tool Components

Tool components handle specific AI tool integrations.

### Web Search Config (`components/websearch-config.tsx`)

Configuration interface for web search functionality.

**Props Interface:**

```typescript
interface WebSearchConfigProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  settings: WebSearchSettings;
  onSettingsChange: (settings: WebSearchSettings) => void;
}
```

### Panel Config Component (`components/panel-config.tsx`)

Generic configuration panel for various tools.

**Features:**

- Dynamic form generation
- Validation
- Settings persistence
- Real-time preview

### Functions View Component (`components/functions-view.tsx`)

Display and management of available AI functions.

**Features:**

- Function listing
- Parameter documentation
- Execution history
- Performance metrics

## State Integration

### Zustand Store Integration

Components integrate with Zustand stores for state management:

```typescript
// Example component with store integration
import { useConversationStore } from "@/stores/useConversationStore";

const ChatComponent = () => {
  const { messages, addMessage, clearMessages } = useConversationStore();

  // Component logic
};
```

### State Persistence

Components that need persistence use Zustand's persistence middleware:

```typescript
const usePersistedStore = create(
  persist(
    (set, get) => ({
      // Store definition
    }),
    {
      name: "component-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

## Component Guidelines

### Development Standards

#### TypeScript Usage

- All components must have proper TypeScript interfaces
- Use strict type checking
- Provide default props where appropriate
- Document complex prop types

#### Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation
- Provide screen reader support
- Test with accessibility tools

#### Performance

- Use React.memo for expensive components
- Implement proper dependency arrays for hooks
- Avoid unnecessary re-renders
- Optimize heavy computations

#### Error Handling

- Implement error boundaries where needed
- Provide fallback UI for errors
- Log errors appropriately
- Display user-friendly error messages

### Code Style

#### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Interface definition
interface MyComponentProps extends ComponentProps {
  // Props definition
}

// 3. Component implementation
const MyComponent: React.FC<MyComponentProps> = ({
  prop1,
  prop2,
  ...rest
}) => {
  // 4. Hooks and state
  const [state, setState] = useState();

  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 6. Render
  return (
    <div {...rest}>
      {/* JSX */}
    </div>
  );
};

// 7. Default props (if needed)
MyComponent.defaultProps = {
  // Defaults
};

// 8. Export
export default MyComponent;
```

#### Naming Conventions

- Components: PascalCase (`MyComponent`)
- Props: camelCase (`onButtonClick`)
- Files: kebab-case (`my-component.tsx`)
- CSS classes: kebab-case with BEM (`component__element--modifier`)

### Documentation Requirements

- JSDoc comments for complex components
- README files for component groups
- Storybook stories for reusable components
- Usage examples in documentation

## Testing Components

### Unit Testing

Use Jest and React Testing Library for component testing:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<MyComponent onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Integration Testing

Test component integration with stores and APIs:

```typescript
import { renderWithProviders } from '@/test-utils';
import ChatComponent from './ChatComponent';

describe('ChatComponent Integration', () => {
  it('integrates with conversation store', () => {
    const { store } = renderWithProviders(<ChatComponent />);

    // Test store interactions
  });
});
```

### Visual Testing

Use Storybook for visual component testing and documentation:

```typescript
// MyComponent.stories.tsx
export default {
  title: "Components/MyComponent",
  component: MyComponent,
};

export const Default = {
  args: {
    // Default props
  },
};

export const WithError = {
  args: {
    error: "Error message",
  },
};
```

---

For development setup, see [DEVELOPMENT.md](./DEVELOPMENT.md).
For API integration, see [API.md](./API.md).
