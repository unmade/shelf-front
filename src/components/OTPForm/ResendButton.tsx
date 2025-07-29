import { useEffect, useState } from 'react';

import Button from 'components/ui/Button';

interface Props {
  debounce?: number;
  disabled: boolean;
  initialDebounce?: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function ResendButton({
  debounce = 60,
  disabled,
  initialDebounce = true,
  loading,
  onClick,
}: Props) {
  const [clicked, setClicked] = useState(initialDebounce);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let reset: ReturnType<typeof setTimeout>;
    let timer: ReturnType<typeof setInterval>;

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
  }, [clicked, debounce]);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <Button variant="text" loading={loading} disabled={disabled || clicked} onClick={handleClick}>
      Resend code{secondsLeft ? ` in ${secondsLeft} seconds` : ''}
    </Button>
  );
}
