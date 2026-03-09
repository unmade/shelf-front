import { useTranslation } from 'react-i18next';

export function SharedFilesListHeader() {
  const { t } = useTranslation('files');

  return (
    <div
      role="row"
      className="text-muted-foreground flex items-center gap-4 px-9 py-2 text-xs font-medium tracking-wide uppercase"
    >
      <div className="flex-1">{t('sharedInApp.colName', { defaultValue: 'Name' })}</div>
      <div className="w-32 flex-none @max-2xl:hidden">
        {t('sharedInApp.colMembers', { defaultValue: 'Members' })}
      </div>
      <div className="w-36 flex-none @max-2xl:hidden">
        {t('sharedInApp.colOwner', { defaultValue: 'Owner' })}
      </div>
      {/* Spacer for dropdown button */}
      <div className="size-8 shrink-0" />
    </div>
  );
}
