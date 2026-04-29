import { useMemo, type ComponentType } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router';

import type { IAlbum } from '@/types/photos';

import { useAppSelector } from '@/hooks';

import {
  albumItemsAdapter,
  selectAlbumBySlug,
  useGetAlbumQuery,
  useListAlbumItemsInfiniteQuery,
} from '@/store/albums';

import { ArrowLeftStrokeIcon } from '@/icons';
import * as routes from '@/routes';

import { Button } from '@/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';
import { Spinner } from '@/ui/spinner';

import {
  AlbumMediaItemActionsDropdown,
  type MediaItemActionsDropdownProps,
} from '@/apps/photos/components/album-item-actions-dropdown';
import { MediaItemDialogsProvider } from '@/apps/photos/components/dialogs';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Page, PageContent, PageHeader } from '@/apps/photos/components/page';

const { selectIds } = albumItemsAdapter.getSelectors();

function EmptyContainer() {
  const { t } = useTranslation('photos');

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>
          {t('photos:pages.album.empty.title', {
            defaultValue: 'Nothing here yet',
          })}
        </EmptyTitle>
        <EmptyDescription>
          {t('photos:pages.album.empty.description', {
            defaultValue: 'Add photos to your album to see them here',
          })}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface AlbumContentProps {
  album: IAlbum;
}

function MediaItemBrowserContainer({ album }: AlbumContentProps) {
  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
  } = useListAlbumItemsInfiniteQuery({ albumSlug: album.slug });

  const data = useMemo(
    () => albumItemsAdapter.setAll(albumItemsAdapter.getInitialState(), result?.pages.flat() ?? []),
    [result],
  );

  const mediaItemActionsDropdown = useMemo<ComponentType<MediaItemActionsDropdownProps>>(() => {
    function AlbumActionsDropdown(props: MediaItemActionsDropdownProps) {
      return <AlbumMediaItemActionsDropdown {...props} albumSlug={album.slug} />;
    }

    AlbumActionsDropdown.displayName = 'AlbumActionsDropdown';
    return AlbumActionsDropdown;
  }, [album.slug]);

  const empty = isSuccess && selectIds(data).length === 0;
  if (empty) {
    return (
      <div className="flex h-full">
        <EmptyContainer />
      </div>
    );
  }

  return (
    <MediaItemsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      itemsCount={album.itemsCount}
      loadMore={fetchNextPage}
    >
      <MediaItemBrowser mediaItemActionsDropdown={mediaItemActionsDropdown} />
    </MediaItemsBrowserDataProvider>
  );
}

export default function Album() {
  const { t } = useTranslation('photos');

  const { albumId } = useParams<{ albumId: string }>();

  const albumTitle = useAppSelector((state) => selectAlbumBySlug(state, albumId ?? '')?.title);

  const { data: album, isLoading, isError } = useGetAlbumQuery(albumId ?? skipToken);

  if (!albumId || isError) {
    return <Navigate to={routes.PHOTOS_ALBUMS.prefix} replace />;
  }

  const title =
    album?.title ??
    albumTitle ??
    t('photos:pages.albums.title', {
      defaultValue: 'Albums',
    });

  return (
    <MediaItemDialogsProvider>
      <Helmet>
        <title>Shelf Photos</title>
      </Helmet>
      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={routes.PHOTOS_ALBUMS.prefix}>
                <ArrowLeftStrokeIcon data-slot="icon" />
              </Link>
            </Button>
            <Heading className="py-0.5">{title}</Heading>
          </div>
        </PageHeader>
        <PageContent>
          {isLoading ? (
            <Spinner className="h-full" />
          ) : (
            <MediaItemBrowserContainer album={album!} />
          )}
        </PageContent>
      </Page>
    </MediaItemDialogsProvider>
  );
}
