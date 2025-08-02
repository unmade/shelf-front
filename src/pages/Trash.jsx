import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import useDirPath from '../hooks/dir-path';
import { useIsLaptop } from '../hooks/media-query';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import Button from '../components/ui-legacy/Button';
import Empty from '../components/ui-legacy/Empty';

import BreadcrumbDropdown from '../components/BreadcrumbDropdown';
import EmptyTrashDialogProvider, {
  useEmptyTrashDialog,
} from '../components/EmptyTrashDialogProvider';
import DeleteImmediatelyDialogProvider from '../components/DeleteImmediatelyDialogProvider';
import GoBackButton from '../components/GoBackButton';
import MoveDialogProvider from '../components/MoveDialogProvider';
import PageHeader from '../components/PageHeader';

import BrowserContainer from '../containers/BrowserContainer';
import FilePreviewContainer from '../containers/FilePreviewContainer';

function EmptyTrashDialogButton() {
  const { t } = useTranslation();

  const openEmptyTrashDialog = useEmptyTrashDialog();

  return (
    <Button
      variant="primary"
      color="danger"
      title={t('Empty Trash')}
      size="base"
      onClick={openEmptyTrashDialog}
      icon={<icons.TrashOutlined className="h-5 w-5 shrink-0" />}
    />
  );
}

function EmptyContainer({ path }) {
  const { t } = useTranslation();

  const icon = <icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />;

  let title;
  let description;
  if (path === TRASH_FOLDER_NAME) {
    title = t('Trash folder is empty');
    description = t('Deleted file will appear here');
  } else {
    title = t('This folder is empty');
    description = null;
  }

  return <Empty icon={icon} title={title} description={description} />;
}

EmptyContainer.propTypes = {};

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
              <div className="flex h-full flex-col">
                <PageHeader>
                  <PageHeader.Title
                    icon={
                      <GoBackButton to={routes.parent(dirPath)} disabled={routes.isRoot(dirPath)} />
                    }
                  >
                    {isLaptop ? title : <BreadcrumbDropdown items={breadcrumbs} />}
                  </PageHeader.Title>
                  <PageHeader.Actions>
                    <EmptyTrashDialogButton />
                  </PageHeader.Actions>
                </PageHeader>

                <BrowserContainer
                  breadcrumbs={breadcrumbs}
                  path={dirPath}
                  emptyView={<EmptyContainer path={dirPath} />}
                />
              </div>
            )}
          </MoveDialogProvider>
        </DeleteImmediatelyDialogProvider>
      </EmptyTrashDialogProvider>
    </>
  );
}

export default Trash;

Trash.propTypes = {};
