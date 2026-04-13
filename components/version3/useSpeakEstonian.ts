"use client";

import { useCallback, useEffect } from "react";

/**
 * Browser speech synthesis for Estonian. Uses an Estonian voice when available.
 *
 * Chrome/Safari often need: cancel → resume (if paused) → speak on a later task,
 * with a fresh SpeechSynthesisUtterance created after cancel completes.
 */
export function useSpeakEstonian() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const primeVoices = () => {
      window.speechSynthesis.getVoices();
    };

    primeVoices();
    window.speechSynthesis.addEventListener("voiceschanged", primeVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", primeVoices);
  }, []);

  return useCallback((text: string) => {
    if (typeof window === "undefined" || !text.trim()) return;

    const trimmed = text.trim();
    const speech = window.speechSynthesis;

    speech.cancel();

    const runSpeak = () => {
      try {
        if (speech.paused) {
          speech.resume();
        }

        const speakWithOptionalVoice = (assignVoice: boolean) => {
          const utterance = new SpeechSynthesisUtterance(trimmed);
          utterance.lang = "et-EE";
          utterance.volume = 1;
          utterance.rate = 1;
          utterance.pitch = 1;

          if (assignVoice) {
            const voices = speech.getVoices();
            const etVoice =
              voices.find((v) => v.lang.toLowerCase().startsWith("et")) ??
              voices.find((v) => v.lang.toLowerCase().includes("estonia")) ??
              null;
            if (etVoice) {
              utterance.voice = etVoice;
            }
          }

          utterance.onerror = (ev) => {
            if (ev.error === "canceled" || ev.error === "interrupted") return;
            if (assignVoice) {
              speech.cancel();
              window.setTimeout(() => speakWithOptionalVoice(false), 0);
            }
          };

          speech.speak(utterance);
        };

        speakWithOptionalVoice(true);
      } catch {
        /* ignore */
      }
    };

    // Let cancel() flush; avoids Chrome dropping speak() on the same turn.
    window.setTimeout(runSpeak, 0);
  }, []);
}
