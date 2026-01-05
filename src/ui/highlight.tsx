// This code is taken from: https://github.com/bvaughn/react-highlight.js/blob/master/src/Highlight.js

import { useEffect, useRef } from 'react';

import highlight from 'highlight.js/lib/common';

type Mode = 'dark' | 'light';

interface StyleProps {
  mode: Mode;
}

function Style({ mode }: StyleProps) {
  if (mode === 'dark') {
    return <link rel="stylesheet" type="text/css" href="/hljs/github-dark.css" />;
  }
  return <link rel="stylesheet" type="text/css" href="/hljs/github.css" />;
}

interface Props {
  children: React.ReactNode;
  className?: string;
  language?: string;
  mode: Mode;
}

export function Highlight({ children, className, language, mode }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      highlight.highlightElement(ref.current);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      delete ref.current.dataset.highlighted;
    }
  }, [mode, language]);

  return (
    <>
      <Style mode={mode} />
      <pre className={className}>
        <code className={language} ref={ref}>
          {children}
        </code>
      </pre>
    </>
  );
}
