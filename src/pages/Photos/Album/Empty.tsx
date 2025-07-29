import { useTranslation } from 'react-i18next';

import Empty from 'components/photos/Empty';

export default function EmptyContainer() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.album.empty.title', {
    defaultValue: 'Nothing here yet',
  });

  const description = t('photos:pages.album.empty.description', {
    defaultValue: 'Add photos to your album to see them here',
  });

  return <Empty title={title} description={<p>{description}</p>} />;
}
