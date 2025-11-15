import { useEffect, useState } from 'react';

export function useCountdown(seconds: number) {
  const [waiting, setWaiting] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let reset: ReturnType<typeof setTimeout>;
    let timer: ReturnType<typeof setInterval>;

    if (waiting) {
      setCountdown(seconds);
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      reset = setTimeout(() => {
        setWaiting(false);
      }, seconds * 1000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(reset);
    };
  }, [waiting, seconds]);

  const restart = () => {
    setWaiting(true);
  };

  return { countdown, restart };
}
