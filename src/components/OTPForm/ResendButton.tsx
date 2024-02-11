import React, { useEffect, useState } from 'react';

import Button from 'components/ui/Button';

interface Props {
  debounce?: number;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function ResendButton({ debounce = 60, disabled, loading, onClick }: Props) {
  const [clicked, setClicked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let reset: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (clicked) {
      setSecondsLeft(debounce);
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      reset = setTimeout(() => {
        setClicked(false);
      }, debounce * 1000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(reset);
    };
  }, [clicked]);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <Button
      variant="text"
      className="text-indigo-600 dark:text-indigo-400"
      loading={loading}
      disabled={disabled || clicked}
      onClick={handleClick}
    >
      Resend code{secondsLeft ? ` in ${secondsLeft} seconds` : ''}
    </Button>
  );
}
