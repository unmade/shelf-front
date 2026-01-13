import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';

import { Page, PageHeader, PageHeaderActions, PageHeaderTitle } from '@/apps/files/components/page';

import useDirPath from '../hooks/dir-path';
import { useIsLaptop } from '../hooks/media-query';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import BreadcrumbDropdown from '../components/BreadcrumbDropdown';
import EmptyTrashDialogProvider, {
  useEmptyTrashDialog,
} from '../components/EmptyTrashDialogProvider';
import DeleteImmediatelyDialogProvider from '../components/DeleteImmediatelyDialogProvider';
import GoBackButton from '../components/GoBackButton';
import MoveDialogProvider from '../components/MoveDialogProvider';

import BrowserContainer from '../containers/BrowserContainer';
import FilePreviewContainer from '../containers/FilePreviewContainer';

function EmptyTrashDialogButton() {
  const { t } = useTranslation();

  const openEmptyTrashDialog = useEmptyTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('Empty Trash')}
      onClick={openEmptyTrashDialog}
    >
      <icons.TrashOutlined />
    </Button>
  );
}

function EmptyContainer({ path }) {
  const { t } = useTranslation();

  let title;
  let description;
  if (path === TRASH_FOLDER_NAME) {
    title = t('Trash folder is empty');
    description = t('Deleted file will appear here');
  } else {
    title = t('This folder is empty');
    description = null;
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <icons.Collection />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function Trash() {
  const { t } = useTranslation();

  let dirPath = useDirPath();
  dirPath = dirPath === '.' ? TRASH_FOLDER_NAME : routes.join(TRASH_FOLDER_NAME, dirPath);
  const pathToPreview = useResolvedPreviewSearchParam();
  const isLaptop = useIsLaptop();

  const breadcrumbs = routes.breadcrumbs(dirPath);
  if (!isLaptop) {
    breadcrumbs.reverse();
  }

  const title = routes.folderName(dirPath);

  return (
    <>
      <Helmet>
        <title>{t('Trash')} - Shelf</title>
      </Helmet>
      <EmptyTrashDialogProvider>
        <DeleteImmediatelyDialogProvider>
          <MoveDialogProvider>
            {pathToPreview ? (
              <FilePreviewContainer dirPath={dirPath} />
            ) : (
              <Page>
                <PageHeader>
                  <PageHeaderTitle>
                    {isLaptop ? (
                      <>
                        <GoBackButton
                          to={routes.parent(dirPath)}
                          disabled={routes.isRoot(dirPath)}
                        />
                        <Heading>{title}</Heading>
                      </>
                    ) : (
                      <BreadcrumbDropdown items={breadcrumbs} />
                    )}
                  </PageHeaderTitle>
                  <PageHeaderActions>
                    <EmptyTrashDialogButton />
                  </PageHeaderActions>
                </PageHeader>

                <BrowserContainer
                  breadcrumbs={breadcrumbs}
                  path={dirPath}
                  emptyView={<EmptyContainer path={dirPath} />}
                />
              </Page>
            )}
          </MoveDialogProvider>
        </DeleteImmediatelyDialogProvider>
      </EmptyTrashDialogProvider>
    </>
  );
}

export default Trash;

Trash.propTypes = {};
