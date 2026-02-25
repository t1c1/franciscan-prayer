import { NextRequest, NextResponse } from "next/server";

const MAX_TEXT_CHARS = 4800;
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "6nHqsk4yqXJbeTHWkGQB";
const DEFAULT_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

const LANGUAGE_CODES: Record<string, string> = {
  latin: "la",
  en: "en",
  es: "es",
  it: "it",
  fr: "fr",
  zh: "zh",
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing ElevenLabs configuration" },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => null);
    const rawText = typeof body?.text === "string" ? body.text : "";
    const locale = typeof body?.locale === "string" ? body.locale : "en";
    const text = rawText.trim();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > MAX_TEXT_CHARS) {
      return NextResponse.json(
        { error: `Text exceeds ${MAX_TEXT_CHARS} character limit` },
        { status: 413 }
      );
    }

    const payload: Record<string, unknown> = {
      text,
      model_id: DEFAULT_MODEL_ID,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: true,
      },
    };

    const languageCode = LANGUAGE_CODES[locale];
    if (languageCode) {
      payload.language_code = languageCode;
    }

    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    if (!elevenLabsResponse.ok) {
      const detail = await elevenLabsResponse.text();
      return NextResponse.json(
        {
          error: "ElevenLabs request failed",
          detail: detail.slice(0, 300),
        },
        { status: 502 }
      );
    }

    const audio = await elevenLabsResponse.arrayBuffer();
    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("TTS API error", error);
    return NextResponse.json({ error: "Failed to synthesize audio" }, { status: 500 });
  }
}
