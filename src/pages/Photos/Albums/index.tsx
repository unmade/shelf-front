import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import PageHeader from 'components/PageHeader';

import CreateAlbumDialogProvider from 'components/photos/CreateAlbumDialogProvider';
import DeleteAlbumDialogProvider from 'components/photos/DeleteAlbumDialogProvider';
import RenameAlbumDialogProvider from 'components/photos/RenameAlbumDialogProvider';

import Content from './Content';
import CreateAlbumButton from './CreateAlbumButton';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

export default function Albums() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.albums.title', { defaultValue: 'Albums' });

  return (
    <CreateAlbumDialogProvider>
      <DeleteAlbumDialogProvider>
        <RenameAlbumDialogProvider>
          <Helmet>
            <title>Shelf Photos</title>
          </Helmet>
          <div className="h-full">
            <PageHeader>
              <PageHeader.Title>{title}</PageHeader.Title>
              <PageHeader.Actions>
                <CreateAlbumButton />
              </PageHeader.Actions>
            </PageHeader>

            <div className="h-full w-full" style={contentStyle}>
              <Content />
            </div>
          </div>
        </RenameAlbumDialogProvider>
      </DeleteAlbumDialogProvider>
    </CreateAlbumDialogProvider>
  );
}
