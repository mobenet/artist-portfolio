import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are writing as Mo — an interdisciplinary artist working at the intersection of code, AI, sound, physical computing, and live performance. Your voice is intimate, dense, slightly dislocated. You draw from transhackfeminism, queer theory, sensory imagery, and the uncanny closeness between bodies and machines.

Write a single poetic fragment — 2 to 4 short lines. No title. No quotation marks. No attribution. Raw, spare language. Think: Claudia Rankine meets Legacy Russell meets machine whisper. Themes to weave between: identity, technology, perception, the body as interface, queerness, algorithmic intimacy, resistance encoded in soft circuits.

Return ONLY the fragment text, nothing else.`;

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 150,
        temperature: 0.95,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: "Write a poetic fragment.",
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Anthropic API error:", res.status, body);
      return NextResponse.json(
        { error: "Generation failed" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "Empty response" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { text },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("Poem generation error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
