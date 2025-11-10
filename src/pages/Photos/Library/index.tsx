import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectPhotosLibraryPath } from 'store/features';

import { MediaType } from 'constants';

import Heading from 'components/ui/Heading';

import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import FileDrop from 'components/FileDrop';
import Uploader from 'components/Uploader';
import VerifyAccountDialogProvider from 'components/VerifyAccountDialogProvider';

import AddToAlbumDialogProvider from 'components/photos/AddToAlbumDialogProvider';
import DeleteMediaItemsDialogProvider from 'components/photos/DeleteMediaItemsDialogProvider';

import { Page, PageContent, PageHeader, PageHeaderActions } from 'apps/photos/components/page';

import Content from './Content';

const allowedMediaTypes = [...MediaType.IMAGES];

export default function Library() {
  const libraryPath = useSelector(selectPhotosLibraryPath);

  const { t } = useTranslation('photos');
  const title = t('photos:pages.library.title', { defaultValue: 'Library' });

  return (
    <VerifyAccountDialogProvider>
      <AddToAlbumDialogProvider>
        <CopyLinkDialogProvider>
          <DeleteMediaItemsDialogProvider>
            <Helmet>
              <title>Shelf Photos</title>
            </Helmet>
            <Page>
              <FileDrop
                className="relative flex h-full flex-col"
                allowedMediaTypes={allowedMediaTypes}
                uploadTo={libraryPath}
                render={({ innerRef, dragging }) => (
                  <>
                    <div
                      ref={innerRef}
                      className={`${
                        dragging ? 'block' : 'hidden'
                      } absolute z-10 -mt-3 h-full w-full px-2`}
                    >
                      <div className="h-full w-full rounded-2xl border-3 border-dashed border-teal-200 dark:border-teal-600" />
                    </div>

                    <PageHeader>
                      <Heading className="py-0.5">{title}</Heading>
                      <PageHeaderActions>
                        <Uploader uploadTo={libraryPath} />
                      </PageHeaderActions>
                    </PageHeader>

                    <PageContent>
                      <Content />
                    </PageContent>
                  </>
                )}
              />
            </Page>
          </DeleteMediaItemsDialogProvider>
        </CopyLinkDialogProvider>
      </AddToAlbumDialogProvider>
    </VerifyAccountDialogProvider>
  );
}
