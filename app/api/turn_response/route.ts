import { MODEL, MAX_RESPONSE_TOKENS, MAX_RESPONSE_CHARS } from "@/config/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { messages, tools } = await request.json();
    console.log("Received messages:", messages);

    const openai = new OpenAI();

    const events = await openai.responses.create({
      model: MODEL,
      input: messages,
      tools,
      stream: true,
      parallel_tool_calls: false,
      max_output_tokens: MAX_RESPONSE_TOKENS,
    });

    // Create a ReadableStream that emits SSE data
    const stream = new ReadableStream({
      async start(controller) {
        let charCount = 0;
        const maxChars = MAX_RESPONSE_CHARS;
        try {
          for await (const event of events) {
            // Sending all events to the client with character limit enforcement
            if (event.type === "response.output_text.delta") {
              const delta = event.delta || "";
              const remaining = maxChars - charCount;
              const outputDelta = delta.length > remaining ? delta.slice(0, remaining) : delta;
              charCount += outputDelta.length;
              const truncated = {
                event: event.type,
                data: { ...event, delta: outputDelta },
              };
              controller.enqueue(`data: ${JSON.stringify(truncated)}\n\n`);
              if (charCount >= maxChars) {
                break;
              }
            } else {
              const data = JSON.stringify({
                event: event.type,
                data: event,
              });
              controller.enqueue(`data: ${data}\n\n`);
            }
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
      { status: 500 }
    );
  }
}
