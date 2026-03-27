import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckIcon, CopyIcon } from '@/icons';

import { useSharedLink } from '@/hooks/shared-link';

import { Button } from '@/ui/button';

interface CopyLinkButtonProps {
  token: string;
  filename: string;
}

export function CopyLinkButton({ token, filename }: CopyLinkButtonProps) {
  const { t } = useTranslation('files');
  const link = useSharedLink({ token, filename });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      className="text-muted-foreground invisible group-hover/item:visible"
      size="sm"
      variant="outline"
      title={t('sharedViaLink.copyLink', { defaultValue: 'Copy link' })}
      onClick={() => {
        if (link) {
          navigator.clipboard?.writeText(link);
          setCopied(true);
        }
      }}
      disabled={!link}
    >
      {copied ? <CheckIcon className="text-teal-500" /> : <CopyIcon />}
      {t('sharedViaLink.copyLink', { defaultValue: 'Copy link' })}
    </Button>
  );
}
