import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

interface UseTypewriterReturn {
  displayed: string;
  done: boolean;
}

export function useTypewriter({ text, speed = 38, startDelay = 600 }: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((prev) => {
          const next = prev + 1;
          if (next >= text.length) {
            clearInterval(interval);
            setDone(true);
            return text.length;
          }
          return next;
        });
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  useEffect(() => {
    setDisplayed(text.slice(0, index));
  }, [text, index]);

  return { displayed, done };
}