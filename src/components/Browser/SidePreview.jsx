import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';

import { getFilesByIds } from '../../store/reducers/files';
import { getSelectedFileIds } from '../../store/reducers/ui';

import { MediaType } from '../../constants';

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
        <div className="flex h-64 w-auto items-center justify-center rounded-xl bg-gray-50">
          <Thumbnail className="h-60 w-80 shrink-0 xl:w-96" size="xl" fileId={file.id} />
        </div>

        <div className="flex items-center justify-between py-2 pl-2">
          <div className="min-w-0 text-gray-800">
            <p className={`${fontSize} break-words font-semibold`}>{file.name}</p>
            <p className="text-xs text-gray-600">
              <FileSize size={file.size} />
              <span className="px-1">&bull;</span>
              <TimeAgo mtime={file.mtime * 1000} />
            </p>
          </div>
          <BookmarkButton fileId={file.id} className="hover:bg-orange-50" size="lg" />
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
          <FileInfoTabs fileId={file.id} />
        </div>
      </div>
    </>
  );
}

SingleFilePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mtime: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

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
        <div className="flex h-64 w-auto items-center justify-center rounded-xl bg-gray-50">
          {previews.map((file, i) => (
            <span
              key={file.id}
              className={`absolute transform drop-shadow-xl ${
                i === previews.length - 1 ? 'rotate-0' : rotations[i]
              }`}
            >
              <Thumbnail className="h-56 w-56" size="lg" fileId={file.id} />
            </span>
          ))}
        </div>

        <div className="p-2 text-gray-800">
          <p className="break-words text-lg font-semibold">
            {t('items_count', { count: files.length })}
          </p>
          <p className="text-xs text-gray-600">
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
            <Button type="primary" size="xs">
              {t('Download')}
            </Button>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <SidePreviewActions files={files} />
          </div>
        </div>

        <div className="mt-2 p-2">
          <h3 className="text-base font-semibold">{t('Information')}</h3>
          <div className="divide-y text-xs font-medium">
            <div className="flex justify-between py-2">
              <p className="text-gray-500">{t('Size')}</p>
              <p>
                <FileSize size={size} />
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-500">{t('Created')}</p>
              <p>
                <TimeAgo mtime={minMtime.mtime * 1000} format="ll" />
                &nbsp;-&nbsp;
                <TimeAgo mtime={maxMtime.mtime * 1000} format="ll" />
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-500">{t('Modified')}</p>
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
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mediatype: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

function SidePreview() {
  const selectedIds = useSelector(getSelectedFileIds);
  const files = useSelector((state) => getFilesByIds(state, { ids: selectedIds }), shallowEqual);
  return (
    <div className="mr-4 mb-4 rounded-lg border-4 border-transparent bg-white text-gray-800">
      {files.length === 1 ? (
        <SingleFilePreview file={files[0]} />
      ) : (
        <MultiFilePreview files={files} />
      )}
    </div>
  );
}

SidePreview.propTypes = {};

export default SidePreview;
