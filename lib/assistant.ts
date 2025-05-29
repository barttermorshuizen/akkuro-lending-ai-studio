import { Annotation } from "@/components/annotations";
import { functionsMap } from "@/config/functions";
import { regulatoryInstructions } from "@/config/instruction/regulatory";
import { stateInstructions } from "@/config/stateInstructions";
import { handleTool } from "@/lib/tools/tools-handling";
import useConversationStore from "@/stores/useConversationStore";
import { useRegulatoryCheckStore } from "@/stores/useRegulatoryCheck";
import { parse } from "partial-json";
import {
  formatPlainTextForMarkdown,
  parseStreamingJson,
} from "./json/parseStreamingJson";
import {
  getPushMessageForFunction,
  PushMessageFunction,
  pushMessageFunctions,
} from "./messages/custom-message";
import { getTools } from "./tools/tools";

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
  sendAt?: Date;
  isFinal?: boolean;
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
  sendAt?: Date;
}

export type Item = MessageItem | ToolCallItem;

export const handleTurn = async (
  messages: any[],
  tools: any[],
  onMessage: (data: any) => void,
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
      // console.log("Received chunk:", chunkValue); // Log received chunk
      buffer += chunkValue;
      // console.log("Current buffer:", buffer); // Log current buffer

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
  const includeRegulatoryCheckFromInitialSetup =
    useRegulatoryCheckStore.getState().includeRegulatoryCheckFromInitialSetup;
  const stateInstruction = includeRegulatoryCheckFromInitialSetup
    ? regulatoryInstructions[conversationState]
    : stateInstructions[conversationState];

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
        useConversationStore.getState().setIsProcessingNewMessage(false);
        const { delta, item_id, annotation } = data;
        let partial = "";
        if (typeof delta === "string") {
          partial = delta;
        }
        assistantMessageBuffer += partial;

        // If the last message isn't an assistant message, create a new one
        const lastItem = chatMessages[chatMessages.length - 1];
        if (
          !lastItem ||
          lastItem.type !== "message" ||
          lastItem.role !== "assistant" ||
          (lastItem.id && lastItem.id !== item_id)
        ) {
          try {
            const parsed = parseStreamingJson(assistantMessageBuffer);
            console.log("parsed push message add", parsed);
            chatMessages.push({
              type: "message",
              role: "assistant",
              id: item_id,
              content: [
                {
                  type: "output_text",
                  text: formatPlainTextForMarkdown(parsed.text || ""),
                  choices: parsed.choices,
                  annotations: annotation ? [annotation] : [],
                },
              ],
            } as MessageItem);
          } catch {
            console.error("Failed to parse JSON");
          }
        } else {
          const contentItem = lastItem.content[0];
          if (contentItem && contentItem.type === "output_text") {
            try {
              const parsed = parseStreamingJson(assistantMessageBuffer);
              console.log("parsed push message update", parsed);

              contentItem.text = formatPlainTextForMarkdown(parsed.text || "");
              contentItem.choices = parsed.choices;
            } catch {
              console.error("Failed to parse JSON");
            }
          }
          if (annotation) {
            contentItem.annotations = [
              ...(contentItem.annotations ?? []),
              annotation,
            ];
          }
        }
        setChatMessages([...chatMessages]);
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
            try {
              if (
                !item ||
                !item.content ||
                !Array.isArray(item.content) ||
                item.content.length === 0
              ) {
                currentMessageItem = {
                  type: "message",
                  role: "assistant",
                  id: item.id,
                  content: [
                    {
                      type: "output_text",
                      text: "",
                      choices: [],
                    },
                  ],
                  sendAt: new Date(),
                };
                chatMessages.push(currentMessageItem);

                setChatMessages([...chatMessages]);
              }
            } catch {
              console.error("Failed to parse JSON");
              // Continue accumulating if not valid JSON yet
            }
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
              sendAt: new Date(),
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
              sendAt: new Date(),
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
              sendAt: new Date(),
            });
            setChatMessages([...chatMessages]);
            break;
          }
        }
        break;
      }

      case "response.output_item.done": {
        useConversationStore.getState().setIsProcessingNewMessage(false);

        // After output item is done, adding tool call ID
        const { item } = data || {};

        if (item.type === "message") {
          const targetMessage = chatMessages.find((m) => m.id === item.id);
          if (targetMessage && targetMessage.type === "message") {
            targetMessage.isFinal = true;
            setChatMessages([...chatMessages]);
          }
        }

        const toolCallMessage = chatMessages.find((m) => m.id === item.id);
        if (toolCallMessage && toolCallMessage.type === "tool_call") {
          toolCallMessage.call_id = item.call_id;
          setChatMessages([...chatMessages]);
        }

        if (
          item.type === "message" &&
          item.content &&
          item.content.length > 0
        ) {
          try {
            const parsed = parseStreamingJson(item.content[0].text);
            const itemDone = {
              ...item,
              content: [
                {
                  ...item.content[0],
                  text: parsed.text
                    ? formatPlainTextForMarkdown(parsed.text || "")
                    : parsed,
                  choices: parsed.choices,
                },
              ],
            };
            conversationItems.push(itemDone);
            setConversationItems([...conversationItems]);
          } catch {
            // partial JSON can fail parse; ignore
          }
        }

        assistantMessageBuffer = "";
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
            toolCallMessage.parsedArguments,
          );

          // Record tool output
          toolCallMessage.output = JSON.stringify(toolResult);
          setChatMessages([...chatMessages]);

          // Create a response message based on the tool result
          let responseText = "";
          if (typeof toolResult === "object") {
            if ("status" in toolResult && toolResult.status === "success") {
              responseText =
                "message" in toolResult &&
                typeof toolResult.message === "string"
                  ? toolResult.message
                  : "I've successfully completed that action for you.";
            } else if ("error" in toolResult) {
              responseText = `I encountered an error while trying to do that: ${toolResult.error}`;
            }
          }

          // Add response message
          if (
            pushMessageFunctions.includes(
              toolCallMessage.name as keyof typeof functionsMap,
            )
          ) {
            const responseMessage: MessageItem = {
              type: "message",
              role: "assistant",
              id: `${item_id}_response`,
              content: [
                {
                  type: "output_text",
                  text:
                    responseText ||
                    getPushMessageForFunction(
                      toolCallMessage.name as PushMessageFunction,
                    ),
                },
              ],
              sendAt: new Date(),
              isFinal: true,
            };
            chatMessages.push(responseMessage);
            setChatMessages([...chatMessages]);
          }

          // Add to conversation items
          conversationItems.push({
            role: "assistant",
            content: responseText || "Tool execution completed successfully.",
          });

          // Determine message based on the current tool
          let confirmationText = "";
          let choices: string[] = [];

          switch (toolCallMessage.name) {
            case "store_initial_setup":
              confirmationText =
                "Great! I've stored all the initial setup details. Please check the details and let me know if you'd like to move to the next step.";
              choices = ["Move to next step"];
              break;
            case "store_is_regulatory_check_at_every_step":
              confirmationText =
                "Perfect! I've remembered your choice. Should we move on to defining the loan parameters? This is where we'll set up who can qualify for this loan.";
              choices = ["Yes", "No"];
              break;
            case "store_loan_parameters":
              confirmationText =
                "Perfect! I've saved all the loan parameters. Should we move on to defining the acceptance criteria? This is where we'll set up who can qualify for this loan.";
              choices = ["Yes", "No"];
              break;
            case "store_acceptance_criteria":
              confirmationText =
                "Excellent! The acceptance criteria are all set. Ready to move on to pricing? We'll need to determine interest rates, fees, and any special discounts.";
              choices = ["Yes", "No"];
              break;
            case "store_pricing":
              confirmationText =
                "I've stored all the pricing details. Should we proceed with the regulatory check? This will ensure our product complies with all necessary regulations.";
              choices = ["Yes", "No"];
              break;
            case "store_regulatory_check":
              confirmationText =
                "Great! All regulatory requirements are stored. Would you like to move to the final go-live phase? We'll review everything and set up the launch details.";
              choices = ["Yes", "No"];
              break;
            case "store_go_live":
              confirmationText =
                "Everything is set up and ready to go! Would you like to check the product model in Akkuro Studio, or generate the pdf compliance document?";
              choices = ["Check product model", "Generate pdf compliance"];
              break;
          }

          // Create confirmation message if we have text and choices
          if (confirmationText) {
            const confirmationMessage: MessageItem = {
              type: "message",
              role: "assistant",
              content: [
                {
                  type: "output_text",
                  text: confirmationText,
                  choices: choices,
                },
              ],
              sendAt: new Date(),
              isFinal: true,
            };

            // Add to conversation items
            conversationItems.push({
              role: "assistant",
              content: confirmationMessage.content[0].text,
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
      case "response.completed": {
        console.log("response.completed", data);
        useConversationStore.getState().setIsProcessingNewMessage(false);
        break;
      }
      // Handle other events as needed
    }
  });
};
