import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppSelector } from 'hooks';

import { useGetAlbumQuery, selectListAlbumsData } from 'store/albums';

import * as routes from 'routes';

import Spinner from 'components/ui-legacy/Spinner';

import Heading from 'components/ui/Heading';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import GoBackButton from 'components/GoBackButton';

import AddToAlbumDialogProvider from 'components/photos/AddToAlbumDialogProvider';
import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import { Page, PageHeader, PageContent } from 'apps/photos/components/page';

import Content from './Content';

export default function Album() {
  const { t } = useTranslation('photos');
  const navigate = useNavigate();

  const { albumId } = useParams<{ albumId: string }>();

  const albumTitle = useAppSelector(
    (state) => selectListAlbumsData(state, { pageSize: 100 }).entities[albumId ?? '']?.title,
  );

  const { data: album, isLoading, isError } = useGetAlbumQuery(albumId ?? skipToken);

  if (isError) {
    navigate(routes.PHOTOS_ALBUMS.prefix);
  }

  const title =
    album?.title ??
    albumTitle ??
    t('photos:pages.albums.title', {
      defaultValue: 'Albums',
    });

  return (
    <AddToAlbumDialogProvider>
      <CopyLinkDialogProvider>
        <DeleteMediaItemsDialogProvider>
          <Helmet>
            <title>Shelf Photos</title>
          </Helmet>

          <Page>
            <PageHeader>
              <div className="flex items-center gap-2">
                <GoBackButton to={routes.PHOTOS_ALBUMS.prefix} />
                <Heading className="py-0.5">{title}</Heading>
              </div>
            </PageHeader>
            <PageContent>{isLoading ? <Spinner /> : <Content album={album!} />}</PageContent>
          </Page>
        </DeleteMediaItemsDialogProvider>
      </CopyLinkDialogProvider>
    </AddToAlbumDialogProvider>
  );
}
