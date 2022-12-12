import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectAllSelectedFileIds } from '../../store/browser';

import { FileShape } from '../../types';

import { MediaType, ThumbnailSize } from '../../constants';

import Button from '../ui/Button';
import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import BookmarkButton from '../BookmarkButton';
import FileLink from '../FileLink';
import Thumbnail from '../Thumbnail';
import FileInfoTabs from '../FileInfoTabs';

import SidePreviewActions from './SidePreviewActions';

function getFontSizeFromText(text) {
  if (text.length > 128) {
    return 'text-sm';
  }
  if (text.length > 64) {
    return 'text-md';
  }
  return 'text-lg';
}

function countByTypeText(folderText, documentText, folderCount, documentCount) {
  if (documentCount > 0 && folderCount === 0) {
    return documentText;
  }
  if (documentCount === 0 && folderCount > 0) {
    return folderText;
  }
  return `${documentText}, ${folderText}`;
}

function SingleFilePreview({ file }) {
  const { t } = useTranslation();
  const fontSize = getFontSizeFromText(file.name);

  return (
    <>
      <div className="flex flex-col px-4 pb-2">
        <div className="flex h-64 w-auto items-center justify-center rounded-xl bg-gray-50 dark:bg-zinc-700/30">
          <Thumbnail className="h-60 w-80 shrink-0 xl:w-96" size={ThumbnailSize.xl} file={file} />
        </div>

        <div className="flex items-center justify-between py-2 pl-2">
          <div className="min-w-0 text-gray-800 dark:text-zinc-200">
            <p className={`${fontSize} break-words font-semibold`}>{file.name}</p>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              <FileSize size={file.size} />
              <span className="px-1">&bull;</span>
              <TimeAgo mtime={file.mtime * 1000} />
            </p>
          </div>
          <BookmarkButton
            fileId={file.id}
            className="hover:bg-orange-50 dark:hover:bg-orange-700/30"
            size="lg"
          />
        </div>

        <div className="flex items-center justify-between py-2 pl-2 pr-0.5">
          <div>
            <Button type="primary">
              <FileLink path={file.path} preview={file.mediatype !== MediaType.FOLDER}>
                {t('Open')}
              </FileLink>
            </Button>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <SidePreviewActions files={[file]} />
          </div>
        </div>

        <div className="mt-2 p-2">
          <FileInfoTabs file={file} />
        </div>
      </div>
    </>
  );
}

SingleFilePreview.propTypes = {
  file: FileShape.isRequired,
};

const SingleFilePreviewMemoized = React.memo(SingleFilePreview);

const rotations = {
  0: 'rotate-6',
  1: '-rotate-6',
};

function MultiFilePreview({ files }) {
  const { t } = useTranslation();

  const size = files.reduce((acc, item) => acc + item.size, 0);
  const previews = files.slice(-3);

  let folderCount = 0;
  files.forEach((item) => {
    if (item.mediatype === MediaType.FOLDER) {
      folderCount += 1;
    }
  });

  const minMtime = files.reduce((prev, curr) => (prev.mtime < curr.mtime ? prev : curr), 0);
  const maxMtime = files.reduce((prev, curr) => (prev.mtime > curr.mtime ? prev : curr), 0);

  return (
    <>
      <div className="flex flex-col px-4 pb-2">
        <div className="flex h-64 w-auto items-center justify-center rounded-xl bg-gray-50 dark:bg-zinc-700/30">
          {previews.map((file, i) => (
            <span
              key={file.id}
              className={`absolute transform drop-shadow-xl ${
                i === previews.length - 1 ? 'rotate-0' : rotations[i]
              }`}
            >
              <Thumbnail className="h-56 w-56" size={ThumbnailSize.xl} file={file} />
            </span>
          ))}
        </div>

        <div className="p-2 text-gray-800 dark:text-zinc-200">
          <p className="break-words text-lg font-semibold">
            {t('items_count', { count: files.length })}
          </p>
          <p className="text-xs text-gray-600 dark:text-zinc-400">
            <span>
              {countByTypeText(
                t('folders_count', { count: folderCount }),
                t('documents_count', { count: files.length - folderCount }),
                folderCount,
                files.length - folderCount
              )}
            </span>
            <span className="px-1">&bull;</span>
            <FileSize size={size} />
          </p>
        </div>

        <div className="flex items-center justify-between py-2 pl-2 pr-1">
          <div>
            <Button type="primary">{t('Download')}</Button>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <SidePreviewActions files={files} />
          </div>
        </div>

        <div className="mt-2 p-2">
          <h3 className="text-base font-semibold">{t('Information')}</h3>
          <div className="divide-y text-xs font-medium dark:divide-zinc-700">
            <div className="flex justify-between py-2">
              <p className="text-gray-500 dark:text-zinc-400">{t('Size')}</p>
              <p>
                <FileSize size={size} />
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-500 dark:text-zinc-400">{t('Created')}</p>
              <p>
                <TimeAgo mtime={minMtime.mtime * 1000} format="ll" />
                &nbsp;-&nbsp;
                <TimeAgo mtime={maxMtime.mtime * 1000} format="ll" />
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-500 dark:text-zinc-400">{t('Modified')}</p>
              <p>
                <TimeAgo mtime={minMtime.mtime * 1000} format="ll" />
                &nbsp;-&nbsp;
                <TimeAgo mtime={maxMtime.mtime * 1000} format="ll" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MultiFilePreview.propTypes = {
  files: PropTypes.arrayOf(FileShape.isRequired).isRequired,
};

function SidePreview({ itemsMap }) {
  const selectedIds = useSelector(selectAllSelectedFileIds);

  const files = React.useMemo(() => {
    const entities = [];
    selectedIds.forEach((id) => {
      const entity = itemsMap[id];
      if (entity != null) {
        entities.push(entity);
      }
    });
    return entities;
  }, [selectedIds, itemsMap]);

  return (
    <div className="mr-4 mb-4 rounded-lg border-4 border-transparent text-gray-800 dark:text-zinc-100">
      {files.length === 1 ? (
        <SingleFilePreviewMemoized file={files[0]} />
      ) : (
        <MultiFilePreview files={files} />
      )}
    </div>
  );
}

SidePreview.propTypes = {
  itemsMap: PropTypes.objectOf(FileShape),
};

SidePreview.defaultProps = {
  itemsMap: {},
};

export default SidePreview;
