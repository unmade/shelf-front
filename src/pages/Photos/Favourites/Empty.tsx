import { useTranslation } from 'react-i18next';

import Empty from 'components/photos/Empty';

export default function EmptyContainer() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.favourites.emptyTitle', { defaultValue: 'No favorites yet!' });
  const descriptionLine1 = t('photos:pages.favourites.emptyDescription.line1', {
    defaultValue: 'Start curating your special moments by marking photos as favorites.',
  });
  const descriptionLine2 = t('photos:pages.favourites.emptyDescription.line2', {
    defaultValue: 'Tap the heart icon on any photo you want to appear here',
  });

  return (
    <Empty
      title={title}
      description={
        <>
          <p className="hidden md:block">{descriptionLine1}</p>
          <p>{descriptionLine2}</p>
        </>
      }
    />
  );
}
