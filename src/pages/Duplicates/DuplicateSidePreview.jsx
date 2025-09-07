import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import FileSize from 'components/ui/FileSize';

import { ThumbnailSize } from '../../constants';
import * as icons from '../../icons';
import * as routes from '../../routes';
import { FileShape } from '../../types';

import Button from '../../components/ui-legacy/Button';
import TimeAgo from '../../components/ui-legacy/TimeAgo';

import { useDeleteDialog } from '../../components/DeleteDialogProvider';
import FileLink from '../../components/FileLink';
import Thumbnail from '../../components/Thumbnail';

function FileProperty({ header, value }) {
  return (
    <div className="text-sm">
      <div className="font-medium text-gray-500 dark:text-zinc-500">{header}</div>
      <div>{value}</div>
    </div>
  );
}

FileProperty.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

function DuplicateSidePreview({ file }) {
  const { t } = useTranslation('file');

  const { openDialog: openDeleteDialog } = useDeleteDialog();

  const onDelete = () => {
    openDeleteDialog([file]);
  };

  return (
    <div className="h-full">
      <div className="relative h-2/3 bg-gray-100 dark:bg-zinc-900/50">
        <Thumbnail
          className="absolute right-1/2 h-full translate-x-1/2 p-10"
          size={ThumbnailSize.xxl}
          file={file}
        />
      </div>
      <div className="mt-8 flex px-10">
        <div className="w-1/2 space-y-8">
          <FileProperty header={t('file:name')} value={file.name} />
          <FileProperty header={t('file:path')} value={routes.parent(file.path)} />
        </div>
        <div className="w-1/2 space-y-8">
          <FileProperty header={t('file:size')} value={<FileSize bytes={file.size} />} />
          <FileProperty
            header={t('file:modified')}
            value={<TimeAgo value={file.modified_at} format="LLL" />}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <FileLink path={file.path} preview prefix={routes.DUPLICATES.prefix}>
            <Button
              as="div"
              variant="text"
              className="font-semibold text-blue-500 dark:text-indigo-400"
              icon={<icons.EyeOutlined className="h-4 w-4 text-blue-500 dark:text-indigo-400" />}
            >
              {t('file:preview')}
            </Button>
          </FileLink>
          <Button
            variant="primary"
            color="danger"
            icon={<icons.TrashOutlined className="h-4 w-4" />}
            onClick={onDelete}
          >
            {t('file:delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}

DuplicateSidePreview.propTypes = {
  file: FileShape.isRequired,
};

export default DuplicateSidePreview;
