import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Toggle, type ToggleVariants } from '@/ui/toggle';

import { useToggleFavourite } from '@/components/photos/hooks/toggle-favourite';

interface Props {
  className?: string | ((state: { favourite: boolean }) => string);
  mediaItemIds: string[];
  children: React.ReactNode;
}

export function FavouriteToggle({
  children,
  className,
  mediaItemIds,
  variant,
  size,
}: Props & ToggleVariants) {
  const { t } = useTranslation('photos');

  const { favourite, loading, toggleFavourite } = useToggleFavourite(mediaItemIds);
  const resolvedClassName = typeof className === 'function' ? className({ favourite }) : className;

  const title = favourite
    ? t('photos:mediaItem.actions.unfavourite', {
        defaultValue: 'Unfavourite',
        count: mediaItemIds.length,
      })
    : t('photos:mediaItem.actions.favourite', {
        defaultValue: 'Favourite',
        count: mediaItemIds.length,
      });

  return (
    <Toggle
      title={title}
      aria-label={title}
      className={cn(
        'data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500',
        resolvedClassName,
      )}
      pressed={favourite}
      onPressedChange={toggleFavourite}
      disabled={loading}
      variant={variant}
      size={size}
    >
      {children}
    </Toggle>
  );
}
