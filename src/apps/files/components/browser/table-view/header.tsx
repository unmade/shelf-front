import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Checkbox } from '@/ui/checkbox';

import { useSelectionContext } from '@/apps/files/components/selection-context';

interface TableViewHeaderProps {
  className?: string;
  totalCount: number;
  onSelectAll: () => void;
}

export function TableViewHeader({ className, totalCount, onSelectAll }: TableViewHeaderProps) {
  const { t } = useTranslation();

  const { selectedIds, clearSelection } = useSelectionContext();

  const selectedCount = selectedIds.size;
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const indeterminate = selectedCount > 0 && selectedCount < totalCount;

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    console.log(checked);
    if (checked === true) {
      onSelectAll();
      console.log('select all');
    } else {
      clearSelection();
      console.log('clear selection');
    }
  };

  return (
    <div
      role="row"
      className={cn(
        'text-muted-foreground flex items-center gap-4 px-8 py-2 text-xs font-medium tracking-wide uppercase',
        className,
      )}
    >
      {/* Select all checkbox */}
      <Checkbox
        checked={indeterminate ? 'indeterminate' : allSelected}
        onCheckedChange={handleCheckedChange}
        aria-label={t('Select all files')}
      />
      {/* Name column */}
      <div className="flex-1">
        {selectedCount > 0 ? t('{{count}} selected', { count: selectedCount }) : t('Name')}
      </div>
      {/* Spacer for bookmark button */}
      <div className="size-8 shrink-0" />
      {/* Modified column */}
      <div className="w-40 flex-none">{t('Modified')}</div>
      {/* Size column */}
      <div className="w-28 flex-none pr-4 text-right">{t('Size')}</div>
      {/* Spacer for row actions */}
      <div className="size-8 shrink-0" />
    </div>
  );
}
