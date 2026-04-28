import { useCallback } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import type { UploadEntries } from '@/types/uploads';

import { useAppDispatch } from '@/hooks';

import { mediaItemEntriesAdded } from '@/store/uploads/slice';

import { CloudUploadIcon } from '@/icons';

import { Button } from '@/ui/button';
import { Heading } from '@/ui/heading';

import FileDrop from '@/components/FileDrop';
import Uploader from '@/components/Uploader';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { MediaItemDialogsProvider } from '@/apps/photos/components/dialogs';

import { Page, PageContent, PageHeader, PageHeaderActions } from '@/apps/photos/components/page';

import Content from './Content';

export default function Library() {
  const { t } = useTranslation('photos');

  const dispatch = useAppDispatch();
  const title = t('photos:pages.library.title', { defaultValue: 'Library' });
  const handleFilesAdded = useCallback(
    (files: UploadEntries) => {
      dispatch(mediaItemEntriesAdded({ files }));
    },
    [dispatch],
  );

  return (
    <VerifyAccountDialogProvider>
      <MediaItemDialogsProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <Page>
          <FileDrop className="relative flex h-full flex-col" onFilesAdded={handleFilesAdded}>
            {({ dragging }) => (
              <>
                <div
                  className={`${dragging ? 'block' : 'hidden'} absolute z-10 -mt-3 h-full w-full px-2`}
                >
                  <div className="h-full w-full rounded-2xl border-3 border-dashed border-teal-200 dark:border-teal-600" />
                </div>

                <PageHeader>
                  <Heading className="py-0.5">{title}</Heading>
                  <PageHeaderActions>
                    <Uploader onFilesAdded={handleFilesAdded} uploadScope="mediaItems">
                      <Button size="icon">
                        <CloudUploadIcon />
                      </Button>
                    </Uploader>
                  </PageHeaderActions>
                </PageHeader>

                <PageContent>
                  <Content />
                </PageContent>
              </>
            )}
          </FileDrop>
        </Page>
      </MediaItemDialogsProvider>
    </VerifyAccountDialogProvider>
  );
}
