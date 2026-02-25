import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Toggle, type ToggleVariants } from '@/ui/toggle';

import { useToggleBookmark } from '@/apps/files/hooks/toggle-bookmark';

interface Props {
  className?: string;
  fileIds: string[];
  children: React.ReactNode;
}

export function BookmarkToggle({
  children,
  className,
  fileIds,
  variant,
  size,
}: Props & ToggleVariants) {
  const { t } = useTranslation();

  const { bookmarked, loading, toggleBookmark } = useToggleBookmark(fileIds);

  const title = bookmarked ? t('Remove from bookmarks') : t('Add to bookmarks');

  return (
    <Toggle
      title={title}
      className={cn(
        'data-[state=on]:*:[svg]:fill-orange-600 data-[state=on]:*:[svg]:stroke-orange-600',
        className,
      )}
      pressed={bookmarked}
      onPressedChange={toggleBookmark}
      disabled={loading}
      variant={variant}
      size={size}
    >
      {children}
    </Toggle>
  );
}
