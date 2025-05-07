import { NextResponse } from "next/server";
import { setState, getCurrentState, conversationStates, ConversationState } from "@/lib/stateMachine";

export async function POST(request: Request) {
  try {
    const { nextState } = await request.json();

    if (!nextState || !conversationStates.includes(nextState)) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    setState(nextState as ConversationState);
    const state = getCurrentState();

    // TODO: Broadcast state change via SSE or WebSocket if implemented

    return NextResponse.json({ state });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}