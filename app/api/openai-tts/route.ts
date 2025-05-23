import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { text, voice = "nova" } = await req.json();

  if (!text) {
    return new Response("Text is required", { status: 400 });
  }

  const openaiRes = await fetch(`https://api.openai.com/v1/audio/speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "tts-1-hd",
      voice,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!openaiRes.ok) {
    const error = await openaiRes.json();
    return new Response(error.error.message, { status: 500 });
  }

  const mp3Buffer = await openaiRes.arrayBuffer();

  return new Response(mp3Buffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'inline; filename="speech.mp3"',
    },
  });
}
