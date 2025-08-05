import usePrefersColorScheme from 'hooks/prefers-color-scheme';

interface Props {
  children: React.ReactNode;
}

export default function PrefersColorSchemeProvider({ children }: Props) {
  usePrefersColorScheme();

  return children;
}
