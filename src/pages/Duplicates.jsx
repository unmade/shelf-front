import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { findDuplicates } from '../store/actions/files';
import { getDuplicatesByPath, getFileById } from '../store/reducers/files';

import * as icons from '../icons';

import Button from '../components/ui/Button';
import Thumbnail from '../components/Thumbnail';
import FileSize from '../components/ui/FileSize';
import TimeAgo from '../components/ui/TimeAgo';

function DuplicateGroupItem({ fileId }) {
  const file = useSelector((state) => getFileById(state, fileId));
  return (
    <div className="flex items-center space-x-4 border-t px-7 py-4 text-sm">
      <div className="shrink-0">
        <Thumbnail className="h-10 w-10" fileId={file.id} />
      </div>
      <div>
        <div className="font-medium">{file.name}</div>
        <div className="text-gray-500">{file.path}</div>
      </div>
    </div>
  );
}

function DuplicatePreviewInfoItem({ header, value }) {
  return (
    <div className="text-sm">
      <div className="font-medium text-gray-500">{header}</div>
      <div>{value}</div>
    </div>
  );
}

function DuplicatePreview({ fileId }) {
  const file = useSelector((state) => getFileById(state, fileId));
  if (fileId == null) return null;
  return (
    <div className="h-full">
      <div className="relative h-2/3 bg-gray-100">
        <Thumbnail
          className="absolute right-1/2 h-full translate-x-1/2 p-10"
          size="xl"
          fileId={file.id}
        />
      </div>
      <div className="mt-8 flex bg-white px-10">
        <div className="w-1/2 space-y-8">
          <DuplicatePreviewInfoItem header="Name" value={file.name} />
          <DuplicatePreviewInfoItem header="Path" value={file.path} />
        </div>
        <div className="w-1/2 space-y-8">
          <DuplicatePreviewInfoItem header="Size" value={<FileSize size={file.size} />} />
          <DuplicatePreviewInfoItem
            header="Modified date"
            value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />}
          />
        </div>
        <div>
          <Button danger type="primary">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function Duplicates() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const params = useParams();

  const dirPath = decodeURIComponent(params.dirPath ?? '.');

  const duplicates = useSelector((state) => getDuplicatesByPath(state, dirPath));

  const title = t('Duplicates');

  React.useEffect(() => {
    const maxDistance = 5;
    dispatch(findDuplicates(dirPath, maxDistance));
  }, [dispatch]);

  return (
    <div className="flex h-full">
      {/* left column: search results */}
      <div className="w-1/3">
        {/* header and title */}
        <div className="mx-6 mt-8">
          <h2 className="text-xl font-medium">{title}</h2>
          <span className="text-sm text-gray-500">Lorem ipsum dolor sit amet</span>
        </div>

        {/* select folder and filter buttons */}
        <div className="mx-6 mt-5 flex space-x-6">
          <Button
            className="relative"
            type="default"
            title="Select folder"
            size="base"
            icon={<icons.Folder className="h-5 w-5 text-blue-400" />}
            full
          >
            <span className="text-sm">{dirPath}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <icons.Selector className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Button>
          <Button size="base" icon={<icons.Filter className="h-5 w-6 text-gray-400" />} />
        </div>

        {/* duplicates list */}
        {duplicates && duplicates.length && (
          <div className="mt-7">
            {duplicates.map((group, idx) => (
              <div>
                <div className="border-t bg-gray-50 px-7 py-1 text-sm font-medium text-gray-500">
                  Group #{idx + 1}
                </div>
                {group.map((fileId) => (
                  <DuplicateGroupItem fileId={fileId} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* right column: duplicates preview */}
      <div className="w-2/3 border-l">
        <DuplicatePreview fileId={duplicates && duplicates[1][0]} />
      </div>
    </div>
  );
}

export default Duplicates;
