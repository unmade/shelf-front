import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppSelector } from 'hooks';

import { useGetAlbumQuery, selectListAlbumsData } from 'store/albums';

import * as routes from 'routes';

import Spinner from 'components/ui/Spinner';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import GoBackButton from 'components/GoBackButton';
import PageHeader from 'components/PageHeader';

import AddToAlbumDialogProvider from 'components/photos/AddToAlbumDialogProvider';
import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import Content from './Content';

const headerHeight = '108px';
const contentStyle = {
  height: `calc(100% - ${headerHeight})`,
};

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
          <div className="h-full">
            <PageHeader>
              <PageHeader.Title icon={<GoBackButton to={routes.PHOTOS_ALBUMS.prefix} />}>
                {title}
              </PageHeader.Title>
              <PageHeader.Actions />
            </PageHeader>

            <div className="h-full w-full" style={contentStyle}>
              {isLoading ? <Spinner /> : <Content album={album!} />}
            </div>
          </div>
        </DeleteMediaItemsDialogProvider>
      </CopyLinkDialogProvider>
    </AddToAlbumDialogProvider>
  );
}
