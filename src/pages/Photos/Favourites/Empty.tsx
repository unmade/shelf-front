import { useTranslation } from 'react-i18next';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';

export default function EmptyContainer() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.favourites.emptyTitle', { defaultValue: 'No favorites yet!' });
  const description = t('photos:pages.favourites.emptyDescription', {
    defaultValue: 'Start curating your special moments by marking photos as favorites',
  });

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
