import { useTranslation } from 'react-i18next';

import AdjustButton from './AdjustButton';
import CategoryList from './CategoryList';

interface Props {
  mediaItemId: string;
  readOnly?: boolean;
}

export default function Categories({ mediaItemId, readOnly = false }: Props) {
  const { t } = useTranslation(['photos']);

  return (
    <>
      <div className="flex items-center justify-between sm:text-sm dark:text-zinc-100">
        <h2 className="text-base font-medium">
          {t('photos:mediaItem.categories.title', { defaultValue: 'Categories' })}
        </h2>
        {!readOnly && <AdjustButton mediaItemId={mediaItemId} />}
      </div>
      <div className="flex flex-wrap text-sm capitalize">
        <CategoryList mediaItemId={mediaItemId} />
      </div>
    </>
  );
}
