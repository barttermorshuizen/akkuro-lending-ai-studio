import { MODEL } from "@/config/constants";
import { handleTool } from "@/lib/tools/tools-handling";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// Validate and normalize country code in message content
// Normalize country codes in any string content
function normalizeCountryCode(content: string): string {
  return content.replace(/["']UK["']/g, '"GB"').replace(/["']USA["']/g, '"US"');
}

// Process any object to normalize country codes in string values
function processObject(obj: any): any {
  if (!obj) return obj;

  if (typeof obj === "string") {
    return normalizeCountryCode(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processObject(item));
  }

  if (typeof obj === "object") {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = processObject(value);
    }
    return result;
  }

  return obj;
}

export async function POST(request: Request) {
  try {
    const { messages: rawMessages, tools: rawTools } = await request.json();
    const messages = processObject(rawMessages);
    const tools = processObject(rawTools);
    // console.log("Received messages:", JSON.stringify(rawMessages, null, 2));
    console.log("Processed messages:", JSON.stringify(messages, null, 2));
    console.log("Processed tools:", JSON.stringify(tools, null, 2));
    console.log("OpenAI request payload:", { model: MODEL, messages, tools });
    // Manual function_call handling
    const lastMsg = (messages as any[])[messages.length - 1];
    if (lastMsg.role === "assistant" && (lastMsg as any).function_call) {
      const fc = (lastMsg as any).function_call;
      let params: any = {};
      try {
        params =
          typeof fc.arguments === "string"
            ? JSON.parse(fc.arguments)
            : fc.arguments;
      } catch {}
      const result = await handleTool(fc.name, params);
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            `data: ${JSON.stringify({
              event: "assistant.function_call",
              data: {
                name: fc.name,
                arguments: fc.arguments,
                call_id: fc.call_id,
              },
            })}\n\n`,
          );
          controller.enqueue(
            `data: ${JSON.stringify({
              event: "tool",
              data: {
                call_id: fc.call_id,
                output: JSON.stringify(result),
                role: "tool",
              },
            })}\n\n`,
          );
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const openai = new OpenAI();

    const filteredMessages = messages.filter((msg: any) => {
      return (
        !msg.type ||
        ![
          "function_call",
          "tool",
          "web_search_call",
          "file_search_call",
        ].includes(msg.type)
      );
    });
    console.log("filteredMessages", filteredMessages);

    const validatedMessages = filteredMessages.map(
      (msg: ChatCompletionMessageParam) => {
        if (
          (msg && !("content" in msg)) ||
          (msg && typeof msg.content !== "string") ||
          !msg.content
        ) {
          return {
            ...msg,
            content: "",
          };
        }
        return msg;
      },
    );

    const events = await openai.responses.create({
      model: MODEL,
      input: validatedMessages,
      tools,
      stream: true,
      parallel_tool_calls: false,
    });

    // Create a ReadableStream that emits SSE data
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of events) {
            // Echo assistant function_call when model invokes a tool
            if (
              event.type === "response.output_item.added" &&
              event.item?.type === "function_call"
            ) {
              const fc = event.item;
              const sseFc = {
                event: "assistant.function_call",
                data: {
                  name: fc.name,
                  arguments: fc.arguments,
                  call_id: fc.call_id,
                  item_id: fc.id,
                },
              };
              controller.enqueue(`data: ${JSON.stringify(sseFc)}\n\n`);
            }
            // Invoke tool when function_call completes and emit result
            if (
              event.type === "response.output_item.done" &&
              event.item?.type === "function_call"
            ) {
              const fc = event.item;
              let params: any = {};
              try {
                params = JSON.parse(fc.arguments || "{}");
              } catch {}
              try {
                const result = await handleTool(fc.name as any, params);
                const sseTool = {
                  event: "tool",
                  data: {
                    call_id: fc.call_id,
                    output: JSON.stringify(result),
                    role: "tool",
                  },
                };
                controller.enqueue(`data: ${JSON.stringify(sseTool)}\n\n`);
              } catch (err) {
                console.error("Tool invocation error:", err);
              }
            }
            // Relay all events to the client
            const dataMsg = JSON.stringify({
              event: event.type,
              data: event,
            });
            controller.enqueue(`data: ${dataMsg}\n\n`);
          }
          // End of stream
          controller.close();
        } catch (error) {
          console.error("Error in streaming loop:", error);
          controller.error(error);
        }
      },
    });

    // Return the ReadableStream as SSE
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
