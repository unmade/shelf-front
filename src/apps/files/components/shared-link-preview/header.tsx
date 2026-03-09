import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { PanelRightIcon } from 'lucide-react';

import * as icons from '@/icons';
import * as routes from '@/routes';

import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import { Toggle } from '@/ui/toggle';

interface Props {
  fileName: string;
  sidePanelOpen: boolean;
  onToggleSidePanel: () => void;
}

export function SharedLinkHeader({ fileName, sidePanelOpen, onToggleSidePanel }: Props) {
  const { t } = useTranslation('files');

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 dark:bg-zinc-900">
      <div className="flex items-center gap-2 sm:w-48">
        <icons.AppLogo className="size-10 rounded-lg p-2 dark:bg-white/5" />
        <p className="hidden font-mono text-xl font-bold sm:block">shelf</p>
      </div>

      <div className="min-w-0 px-4 sm:px-8">
        <Text className="truncate text-center font-medium">{fileName}</Text>
      </div>

      <div className="flex items-center justify-end gap-4 sm:w-48">
        <Link to={routes.SIGNIN.prefix} className="hidden sm:inline-block">
          <Button variant="ghost" size="sm">
            {t('sharedLink.signIn', { defaultValue: 'Sign In' })}
          </Button>
        </Link>
        <Link to={routes.SIGNUP.prefix}>
          <Button size="sm">{t('sharedLink.signUp', { defaultValue: 'Sign Up' })}</Button>
        </Link>
        <Toggle
          className="max-sm:hidden"
          size="sm"
          pressed={sidePanelOpen}
          onPressedChange={onToggleSidePanel}
          aria-label={t('sharedLink.toggleInfoPanel', { defaultValue: 'Toggle info panel' })}
        >
          <PanelRightIcon />
        </Toggle>
      </div>
    </header>
  );
}
