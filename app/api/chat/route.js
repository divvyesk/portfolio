import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/lib/chat-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const MAX_TURNS = 12;
const MAX_CHARS = 1200;

/** Small in-memory limiter — enough to stop a single browser hammering the key. */
const hits = new Map();
const LIMIT = 14;
const WINDOW_MS = 60_000;

const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();
  return recent.length > LIMIT;
};

const isChatMessage = (value) => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
};

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "The chat isn't wired up yet. Add GROQ_API_KEY to .env.local and restart the dev server. In the meantime, email me at divvyesk2428@gmail.com.",
      },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "local";

  if (rateLimited(ip)) {
    return Response.json({ error: "That's a lot of questions at once. Give it a minute and try again." }, { status: 429 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = payload?.messages;
  if (!Array.isArray(raw)) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const history = raw
    .filter(isChatMessage)
    .slice(-MAX_TURNS)
    .map((message) => ({ role: message.role, content: message.content.slice(0, MAX_CHARS) }));

  if (history.length === 0) {
    return Response.json({ error: "Ask me something and I'll answer." }, { status: 400 });
  }

  const groq = new Groq({ apiKey });

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.55,
      max_tokens: 480,
      top_p: 0.9,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const token = chunk.choices[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          }
        } catch {
          controller.enqueue(encoder.encode("\n\nSomething cut out on my end. Mind asking that again?"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    const status = error?.status;
    const message =
      status === 401
        ? "That Groq API key was rejected. Double-check GROQ_API_KEY in .env.local."
        : status === 429
          ? "Groq is rate limiting me right now. Try again in a few seconds."
          : "I couldn't reach my brain just then. Try again, or email me at divvyesk2428@gmail.com.";
    return Response.json({ error: message }, { status: status && status >= 400 ? status : 500 });
  }
}
