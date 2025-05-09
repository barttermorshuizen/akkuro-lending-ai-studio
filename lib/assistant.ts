import { parse } from "partial-json";
import { handleTool } from "@/lib/tools/tools-handling";
import useConversationStore from "@/stores/useConversationStore";
import { getTools } from "./tools/tools";
import { Annotation } from "@/components/annotations";
import { functionsMap } from "@/config/functions";
import { stateInstructions } from "@/config/stateInstructions";

export interface ContentItem {
  type: "input_text" | "output_text" | "refusal" | "output_audio";
  annotations?: Annotation[];
  text?: string;
  choices?: string[];
}

// Message items for storing conversation history matching API shape
export interface MessageItem {
  type: "message";
  role: "user" | "assistant" | "system";
  id?: string;
  content: ContentItem[];
}

// Custom items to display in chat
export interface ToolCallItem {
  type: "tool_call";
  tool_type: "file_search_call" | "web_search_call" | "function_call";
  status: "in_progress" | "completed" | "failed" | "searching";
  id: string;
  name?: string | null;
  call_id?: string;
  arguments?: string;
  parsedArguments?: any;
  output?: string | null;
}

export type Item = MessageItem | ToolCallItem;

export const handleTurn = async (
  messages: any[],
  tools: any[],
  onMessage: (data: any) => void
) => {
  try {
    // Get response from the API (defined in app/api/turn_response/route.ts)
    const response = await fetch("/api/turn_response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages,
        tools: tools,
      }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }

    // Reader for streaming data
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log("Received chunk:", chunkValue); // Log received chunk
      buffer += chunkValue;
      console.log("Current buffer:", buffer); // Log current buffer

      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") {
            done = true;
            break;
          }
          try {
            const data = JSON.parse(dataStr);
            console.log("Parsed SSE data:", data); // Log parsed data
            onMessage(data);
          } catch (e) {
            console.error("Failed to parse SSE data:", dataStr, e); // Log parsing errors
          }
        }
      }
    }

    // Handle any remaining data in buffer
    if (buffer && buffer.startsWith("data: ")) {
      const dataStr = buffer.slice(6);
      if (dataStr !== "[DONE]") {
        const data = JSON.parse(dataStr);
        onMessage(data);
      }
    }
  } catch (error) {
    console.error("Error handling turn:", error);
  }
};

export const processMessages = async () => {
  const {
    conversationState,
    chatMessages,
    conversationItems,
    setChatMessages,
    setConversationItems,
  } = useConversationStore.getState();

  // State-specific instruction lookup
  const stateInstruction = stateInstructions[conversationState] ?? "";

  const tools = getTools();
  const allConversationItems = [
    // Adding state-specific system instruction
    {
      role: "system",
      content: stateInstruction,
    },
    ...conversationItems,
  ];

  let assistantMessageBuffer = "";
  let currentMessageItem: MessageItem | null = null;
  let functionArguments = "";

  await handleTurn(allConversationItems, tools, async ({ event, data }) => {
    switch (event) {
      case "response.output_text.delta":
      case "response.output_text.annotation.added": {
        const { delta, item_id, annotation } = data;

        if (typeof delta === "string") {
          assistantMessageBuffer += delta;
        }

        // Try to parse accumulated buffer as JSON
        try {
          const parsed = JSON.parse(assistantMessageBuffer);
          if (parsed.text && Array.isArray(parsed.choices)) {
            // Only create/update message once we have valid JSON
            if (!currentMessageItem || currentMessageItem.id !== item_id) {
              currentMessageItem = {
                type: "message",
                role: "assistant",
                id: item_id,
                content: [{
                  type: "output_text",
                  text: parsed.text,
                  choices: parsed.choices,
                }],
              };
              chatMessages.push(currentMessageItem);
            } else {
              const contentItem = currentMessageItem.content[0];
              if (contentItem && contentItem.type === "output_text") {
                contentItem.text = parsed.text;
                contentItem.choices = parsed.choices;
                if (annotation) {
                  contentItem.annotations = [...(contentItem.annotations ?? []), annotation];
                }
              }
            }
            // Clear buffer after successful parse
            assistantMessageBuffer = "";
            setChatMessages([...chatMessages]);
          }
        } catch {
          // Continue accumulating if not valid JSON yet
        }
        break;
      }

      case "response.output_item.added": {
        const { item } = data || {};
        // New item coming in
        if (!item || !item.type) {
          break;
        }
        // Handle differently depending on the item type
        switch (item.type) {
          case "message": {
            // Skip message handling here as it's already handled in response.output_text.delta
            break;
          }
          case "function_call": {
            functionArguments += item.arguments || "";
            chatMessages.push({
              type: "tool_call",
              tool_type: "function_call",
              status: "in_progress",
              id: item.id,
              name: item.name,
              arguments: item.arguments || "",
              parsedArguments: {},
              output: null,
            });
            setChatMessages([...chatMessages]);
            break;
          }
          case "web_search_call": {
            chatMessages.push({
              type: "tool_call",
              tool_type: "web_search_call",
              status: item.status || "in_progress",
              id: item.id,
            });
            setChatMessages([...chatMessages]);
            break;
          }
          case "file_search_call": {
            chatMessages.push({
              type: "tool_call",
              tool_type: "file_search_call",
              status: item.status || "in_progress",
              id: item.id,
            });
            setChatMessages([...chatMessages]);
            break;
          }
          case "function_call": {
            functionArguments += item.arguments || "";
            chatMessages.push({
              type: "tool_call",
              tool_type: "function_call",
              status: "in_progress",
              id: item.id,
              name: item.name, // function name,e.g. "get_weather"
              arguments: item.arguments || "",
              parsedArguments: {},
              output: null,
            });
            setChatMessages([...chatMessages]);
            break;
          }
          case "web_search_call": {
            chatMessages.push({
              type: "tool_call",
              tool_type: "web_search_call",
              status: item.status || "in_progress",
              id: item.id,
            });
            setChatMessages([...chatMessages]);
            break;
          }
          case "file_search_call": {
            chatMessages.push({
              type: "tool_call",
              tool_type: "file_search_call",
              status: item.status || "in_progress",
              id: item.id,
            });
            setChatMessages([...chatMessages]);
            break;
          }
        }
        break;
      }

      case "response.output_item.done": {
        // After output item is done, adding tool call ID
        const { item } = data || {};

        const toolCallMessage = chatMessages.find((m) => m.id === item.id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.call_id = item.call_id;
          setChatMessages([...chatMessages]);
        }
        conversationItems.push(item);
        setConversationItems([...conversationItems]);
        break;
      }

      case "response.function_call_arguments.delta": {
        // Streaming arguments delta to show in the chat
        functionArguments += data.delta || "";
        let parsedFunctionArguments = {};
        if (functionArguments.length > 0) {
          parsedFunctionArguments = parse(functionArguments);
        }

        const toolCallMessage = chatMessages.find((m) => m.id === data.item_id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.arguments = functionArguments;
          try {
            toolCallMessage.parsedArguments = parsedFunctionArguments;
          } catch {
            // partial JSON can fail parse; ignore
          }
          setChatMessages([...chatMessages]);
        }
        break;
      }

      case "response.function_call_arguments.done": {
        // This has the full final arguments string
        const { item_id, arguments: finalArgs } = data;

        functionArguments = finalArgs;

        // Mark the tool_call as "completed" and parse the final JSON
        const toolCallMessage = chatMessages.find((m) => m.id === item_id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.arguments = finalArgs;
          toolCallMessage.parsedArguments = parse(finalArgs);
          toolCallMessage.status = "completed";
          setChatMessages([...chatMessages]);

          // Handle tool call (execute function)
          const toolResult = await handleTool(
            toolCallMessage.name as keyof typeof functionsMap,
            toolCallMessage.parsedArguments
          );

          // Record tool output
          toolCallMessage.output = JSON.stringify(toolResult);
          setChatMessages([...chatMessages]);
          // Add tool result to conversation items
          conversationItems.push({
            role: "assistant",
            content: "Tool execution completed successfully."
          });
          
          // Determine message based on the current tool
          let confirmationText = "";
          let choices: string[] = [];
          
          switch(toolCallMessage.name) {
            case "store_initial_setup":
              confirmationText = "The initial setup has been stored successfully. Would you like to move to the loan parameters setup?";
              choices = ["Move to loan parameters"];
              break;
            case "store_loan_parameters":
              confirmationText = "The loan parameters have been stored successfully. Would you like to move to the acceptance criteria setup?";
              choices = ["Move to acceptance criteria"];
              break;
            case "store_acceptance_criteria":
              confirmationText = "The acceptance criteria have been stored successfully. Would you like to move to the pricing setup?";
              choices = ["Move to pricing"];
              break;
            case "store_pricing":
              confirmationText = "The pricing details have been stored successfully. Would you like to move to the regulatory check?";
              choices = ["Move to regulatory check"];
              break;
            case "store_regulatory_check":
              confirmationText = "The regulatory requirements have been stored successfully. Would you like to move to the go-live phase?";
              choices = ["Move to go-live"];
              break;
            case "store_go_live":
              confirmationText = "Would you like to check the product model in Akkuro Studio, view the mobile app or start over?";
              choices = ["Check in Akkuro Studio", "View Mobile App", "Start Over"];
              break;
          }
          
          // Create confirmation message if we have text and choices
          if (confirmationText && choices.length > 0) {
            const confirmationMessage: MessageItem = {
              type: "message",
              role: "assistant",
              content: [{
                type: "output_text",
                text: confirmationText,
                choices: choices
              }]
            };
            
            // Add to conversation items
            conversationItems.push({
              role: "assistant",
              content: confirmationMessage.content[0].text
            });
            
            setConversationItems([...conversationItems]);
            
            // Add to chat messages for display
            chatMessages.push(confirmationMessage);
            setChatMessages([...chatMessages]);
          }
          }
          break;
        }

      case "response.web_search_call.completed": {
        const { item_id, output } = data;
        const toolCallMessage = chatMessages.find((m) => m.id === item_id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.output = output;
          toolCallMessage.status = "completed";
          setChatMessages([...chatMessages]);
        }
        break;
      }

      case "response.file_search_call.completed": {
        const { item_id, output } = data;
        const toolCallMessage = chatMessages.find((m) => m.id === item_id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.output = output;
          toolCallMessage.status = "completed";
          setChatMessages([...chatMessages]);
        }
        break;
      }

      // Handle other events as needed
    }

  });
};
