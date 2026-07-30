"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GREETING, CHAT_SUBTITLE, suggestedQuestions } from "@/lib/chat-prompt";
import { OPEN_CHAT } from "@/lib/events";
import { useNavMenuOpen } from "@/hooks/useNavMenuOpen";
import { profile } from "@/lib/resume";
import { Close, Send, Spark, Spider } from "./ui/Icons";

const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

function renderMessageContent(content) {
  const parts = content.split(URL_PATTERN);
  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-volt/70 underline-offset-2 transition-colors hover:text-pink hover:decoration-pink"
        >
          {part}
        </a>
      );
    }
    return <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [nudge, setNudge] = useState(false);
  const navMenuOpen = useNavMenuOpen();

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const send = useCallback(
    async (text) => {
      const question = text.trim();
      if (!question || streaming) return;

      setError(null);
      setInput("");
      const nextHistory = [...messages, { role: "user", content: question }];
      setMessages([...nextHistory, { role: "assistant", content: "" }]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextHistory }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error ?? "I couldn't get through just then. Try once more?");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((current) => {
            const next = [...current];
            const last = next[next.length - 1];
            if (last?.role === "assistant") next[next.length - 1] = { ...last, content: last.content + chunk };
            return next;
          });
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setMessages((current) => current.filter((message, i) => !(i === current.length - 1 && message.content === "")));
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  useEffect(() => {
    const handler = (event) => {
      setOpen(true);
      const seeded = event.detail;
      if (seeded) {
        setTimeout(() => void send(seeded), 380);
      } else {
        setTimeout(() => inputRef.current?.focus(), 420);
      }
    };
    window.addEventListener(OPEN_CHAT, handler);
    return () => window.removeEventListener(OPEN_CHAT, handler);
  }, [send]);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("chat");
    if (param === null) return;
    setOpen(true);
    if (param.length > 1) setTimeout(() => void send(param), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <>
      {!navMenuOpen ? (
      <div className="fixed bottom-0 right-0 z-[75] flex items-center gap-3 safe-bottom pb-5 pr-5 md:pb-7 md:pr-7">
        <AnimatePresence>
          {nudge && !open ? (
            <motion.span
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12 }}
              className="label-sm hidden max-w-[9.5rem] border-[3px] border-ink bg-volt px-3 py-2 leading-relaxed comic-shadow-cyan sm:block"
            >
              Ask if I fit your role
            </motion.span>
          ) : null}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((value) => !value)}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 220, damping: 18 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex size-14 items-center justify-center border-[3px] border-ink bg-pink text-white comic-shadow-pink transition-colors hover:bg-volt hover:text-ink md:size-16"
          aria-label={open ? "Close AI chat" : "Open AI chat"}
        >
          {open ? <Close className="size-5" /> : <Spark className="size-6" />}
          {!open ? (
            <span className="absolute -right-1 -top-1 flex size-3.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex size-3.5 rounded-full border-[2px] border-ink bg-volt" />
            </span>
          ) : null}
        </motion.button>
      </div>
      ) : null}

      <AnimatePresence>
        {open && !navMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97, rotate: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-0 z-[74] mb-[max(6rem,env(safe-area-inset-bottom,0px))] flex max-h-[min(76vh,32rem)] flex-col overflow-hidden border-[3px] border-ink bg-bone comic-shadow sm:inset-x-auto sm:right-7 sm:w-[min(26rem,calc(100vw-2rem))] md:mb-[max(7rem,env(safe-area-inset-bottom,0px))] lg:w-[28rem]"
            role="dialog"
            aria-label="Chat with Divvye's AI"
          >
            <div className="flex shrink-0 items-center justify-between border-b-[3px] border-ink bg-ink px-4 py-3 text-bone">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center bg-pink text-white">
                  <Spider className="size-4" />
                </span>
                <div>
                  <p className="label text-volt">{profile.firstName}&apos;s AI</p>
                  <p className="label-sm mt-1 flex items-center gap-1.5 text-bone/50">
                    <span className={`size-1.5 rounded-full ${streaming ? "bg-volt animate-pulse" : "bg-pink"}`} />
                    {streaming ? "Typing..." : CHAT_SUBTITLE}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 ? (
                  <button
                    onClick={() => {
                      abortRef.current?.abort();
                      setMessages([]);
                      setError(null);
                      setStreaming(false);
                    }}
                    className="label-sm touch-target px-3 py-2 text-bone/50 transition-colors hover:text-volt"
                  >
                    Reset
                  </button>
                ) : null}
                <button
                  onClick={() => setOpen(false)}
                  className="touch-target p-2 text-bone/70 transition-colors hover:text-volt"
                  aria-label="Close chat"
                >
                  <Close className="size-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} data-lenis-prevent className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
              <div className="relative border-[2px] border-ink/15 bg-bone-dim p-3.5 font-mono text-[11px] leading-relaxed text-ink/75">
                <span aria-hidden className="absolute -left-1 -top-3 bg-pink px-2 py-0.5 font-display text-[10px] text-white">
                  HI!
                </span>
                {GREETING}
              </div>

              {messages.length === 0 ? (
                <div className="space-y-2 pt-1">
                  <p className="label-sm text-ash">Try one of these</p>
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => void send(question)}
                      className="touch-target block w-full border-[2px] border-ink/20 px-3 py-3 text-left font-mono text-[11px] leading-relaxed transition-all hover:border-volt hover:bg-volt hover:-translate-y-0.5"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : null}

              {messages.map((message, i) => (
                <div
                  key={i}
                  className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      message.role === "user"
                        ? "border-[2px] border-ink bg-pink text-white comic-shadow-sm"
                        : "border-[2px] border-ink/20 bg-bone-dim text-ink"
                    }`}
                  >
                    {message.content ? (
                      renderMessageContent(message.content)
                    ) : (
                      <span className="flex items-center gap-1.5 py-0.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="size-1.5 rounded-full bg-pink"
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
                          />
                        ))}
                      </span>
                    )}
                    {message.role === "assistant" && streaming && i === messages.length - 1 && message.content ? (
                      <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-volt align-baseline [animation:blink_1s_step-end_infinite]" />
                    ) : null}
                  </div>
                </div>
              ))}

              {error ? (
                <p className="border-[2px] border-pink bg-pink/10 p-3 font-mono text-[11px] leading-relaxed text-ink">
                  {error}
                </p>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
              className="flex shrink-0 items-end gap-2 border-t-[3px] border-ink bg-bone p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(input);
                  }
                }}
                rows={1}
                maxLength={600}
                placeholder="Can you handle a Next.js + MongoDB build?"
                className="max-h-28 min-h-[2.75rem] flex-1 resize-none border-[2px] border-ink/25 bg-bone px-3 py-3 font-mono text-[12px] leading-snug outline-none transition-colors placeholder:text-ash/70 focus:border-pink"
              />
              <button
                type="submit"
                disabled={streaming || input.trim().length === 0}
                className="flex size-11 shrink-0 items-center justify-center border-[2px] border-ink bg-volt text-ink transition-colors hover:bg-pink hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
