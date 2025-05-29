import { MODEL } from "@/config/constants";
import { handleTool } from "@/lib/tools/tools-handling";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { messages, tools } = await request.json();
    // console.log("Received messages:", JSON.stringify(messages, null, 2));
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

    const events = await openai.responses.create({
      model: MODEL,
      input: messages.filter(
        (msg: any) =>
          !msg.type || !["function_call", "tool"].includes(msg.type),
      ),
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
