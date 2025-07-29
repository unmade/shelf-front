import { useTranslation } from 'react-i18next';

import AdjustButton from './AdjustButton';
import CategoryList from './CategoryList';

interface Props {
  fileId: string;
  readOnly?: boolean;
}

export default function Categories({ fileId, readOnly = false }: Props) {
  const { t } = useTranslation(['photos']);

  return (
    <>
      <div className="flex items-center justify-between sm:text-sm dark:text-zinc-100">
        <h2 className="text-base font-medium">
          {t('photos:mediaItem.categories.title', { defaultValue: 'Categories' })}
        </h2>
        {!readOnly && <AdjustButton fileId={fileId} />}
      </div>
      <div className="flex flex-wrap text-sm capitalize">
        <CategoryList fileId={fileId} />
      </div>
    </>
  );
}
