import { useTranslation } from 'react-i18next';

export function SharedLinksListHeader() {
  const { t } = useTranslation('sharedViaLink');

  return (
    <div
      role="row"
      className="text-muted-foreground flex items-center gap-4 px-9 py-2 text-xs font-medium tracking-wide uppercase"
    >
      <div className="flex-1">{t('colName', { defaultValue: 'Name' })}</div>
      {/* Spacer for copy link button */}
      <div className="size-8 shrink-0" />
      <div className="w-40 flex-none @max-2xl:hidden">
        {t('colDateShared', { defaultValue: 'Date Shared' })}
      </div>
      {/* Spacer for dropdown button */}
      <div className="flex shrink-0">
        <div className="size-8" />
      </div>
    </div>
  );
}
