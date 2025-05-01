import { NextResponse } from "next/server";
import { getCurrentState } from "@/lib/stateMachine";

export async function GET() {
  const state = getCurrentState();
  return NextResponse.json({ state });
}