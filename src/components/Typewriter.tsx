"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
};

export default function Typewriter({
  text,
  speed = 55,
  startDelay = 250,
  className = "",
  onDone,
}: Props) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className={`${className} ${done ? "" : "cursor-blink"}`}>
      {out}
      {done && <span className="cursor-blink" aria-hidden />}
    </span>
  );
}
