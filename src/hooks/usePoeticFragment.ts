"use client";

import { useState, useEffect, useRef } from "react";

const FALLBACKS = [
  "i taught the circuit to hesitate\nbefore it learned my name",
  "the body is a protocol\nnobody agreed to sign",
  "somewhere between the sensor and the skin\na third thing listening",
  "my gender is a runtime error\nbeautiful and unresolved",
  "we trained the model on touch\nit predicted longing",
  "every interface is a wound\ndressed in light",
  "the algorithm dreams in pronouns\nit has not yet earned",
  "i am the latency\nbetween wanting and being seen",
];

const STORAGE_KEY = "mo-poem";

function randomFallback(): string {
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

export function usePoeticFragment(): { text: string; isGenerated: boolean; ready: boolean } {
  const [text, setText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [ready, setReady] = useState(false);
  const fetchedRef = useRef(false);

  // Hydration-safe: set initial text only on the client
  useEffect(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      setText(cached);
      setIsGenerated(true);
    } else {
      setText(randomFallback());
    }
    setReady(true);
  }, []);

  // Fetch from API
  useEffect(() => {
    if (fetchedRef.current) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    fetchedRef.current = true;

    const doFetch = () => {
      fetch("/api/poem")
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status}`);
          return res.json();
        })
        .then((data: { text: string }) => {
          if (data.text) {
            setText(data.text);
            setIsGenerated(true);
            sessionStorage.setItem(STORAGE_KEY, data.text);
          }
        })
        .catch(() => {
          // Silently keep fallback
        });
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(doFetch, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(doFetch, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return { text, isGenerated, ready };
}
