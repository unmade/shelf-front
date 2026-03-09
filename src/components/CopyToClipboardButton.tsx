import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import * as icons from '@/icons';

import { Button } from '@/ui/button';

const PENDING = 'pending';
const COPIED = 'copied';

interface Props {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  value: string | null;
}

export function CopyToClipboardButton({ children, className, disabled, title, value }: Props) {
  const [state, setState] = useState(PENDING);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (state === COPIED) {
      timeout = setTimeout(() => {
        setState(PENDING);
      }, 2500);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const onClick = () => {
    if (value != null && value !== '') {
      navigator.clipboard?.writeText(value);
    }
    setState(COPIED);
  };

  return (
    <Button
      title={title}
      className={cn('bg-gray-100 dark:bg-zinc-900', className)}
      variant="outline"
      onClick={onClick}
      disabled={disabled ?? navigator.clipboard == null}
    >
      {state === COPIED ? (
        <icons.Check className="text-teal-400 dark:text-teal-500" />
      ) : (
        <icons.Duplicate className="text-gray-400 dark:text-zinc-500" />
      )}
      {children}
    </Button>
  );
}
