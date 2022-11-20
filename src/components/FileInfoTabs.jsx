import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { FileShape } from '../types';

import * as icons from '../icons';

import FileSize from './ui/FileSize';
import Tabs from './ui/Tabs';
import TimeAgo from './ui/TimeAgo';
import { useGetContentMetadataQuery } from '../store/files';

function Property({ name, value }) {
  return (
    <div className="flex justify-between py-3">
      <p className="text-gray-500 dark:text-zinc-400">{name}</p>
      <p>{value}</p>
    </div>
  );
}

Property.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

function InformationPanel({ file }) {
  const { t } = useTranslation('file');

  return (
    <div className="divide-y text-xs font-medium dark:divide-zinc-700">
      <Property name={t('file:size')} value={<FileSize size={file.size} />} />
      <Property
        name={t('file:created')}
        value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />}
      />
      <Property
        name={t('file:modified')}
        value={<TimeAgo mtime={file.mtime * 1000} format="LLL" />}
      />
    </div>
  );
}

InformationPanel.propTypes = {
  file: FileShape.isRequired,
};

function ExifPanel({ file }) {
  const { t } = useTranslation(['exif']);

  const { path, thumbnail_url: thumbnailUrl } = file;
  const { data, isLoading: loading } = useGetContentMetadataQuery(path, {
    skip: thumbnailUrl == null,
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-3 text-gray-500 dark:text-zinc-400">
        <icons.Spinner className="h-7 w-7 animate-spin text-gray-600 dark:text-zinc-300" />
      </div>
    );
  }

  if (data?.data == null || thumbnailUrl == null) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 py-3 text-gray-500 dark:text-zinc-400">
        <p>{t('exif:notAvailable')}</p>
      </div>
    );
  }

  const { data: meta } = data;

  return (
    <div className="divide-y text-xs font-medium dark:divide-zinc-700">
      {meta.make && <Property name={t('exif:make')} value={`${meta.make}`} />}
      {meta.model && <Property name={t('exif:model')} value={`${meta.model}`} />}
      {meta.width && meta.height && (
        <Property name={t('exif:dimensions')} value={`${meta.width}x${meta.height}`} />
      )}
      {meta.dt_digitized && (
        <Property
          name={t('exif:dateTimeDigitized')}
          value={<TimeAgo mtime={meta.dt_digitized * 1000} format="LLL" />}
        />
      )}
      {meta.dt_original && (
        <Property
          name={t('exif:dateTimeOriginal')}
          value={<TimeAgo mtime={meta.dt_original * 1000} format="LLL" />}
        />
      )}
      {meta.fnumber && <Property name={t('exif:aperture')} value={`ƒ/${meta.fnumber}`} />}
      {meta.exposure && <Property name={t('exif:exposure')} value={meta.exposure} />}
      {meta.iso && <Property name={t('exif:ISO')} value={meta.iso} />}
    </div>
  );
}

ExifPanel.propTypes = {
  file: FileShape.isRequired,
};

function FileInfoTabs({ file }) {
  const { t } = useTranslation('file');

  const tabs = [
    {
      name: t('file:information'),
      panel: InformationPanel,
    },
    {
      name: t('file:exif'),
      panel: ExifPanel,
    },
  ];

  return (
    <Tabs
      tabs={tabs.map(({ name, panel: Panel }) => ({
        name,
        render: <Panel file={file} />,
      }))}
    />
  );
}

export default FileInfoTabs;

FileInfoTabs.propTypes = {
  file: FileShape.isRequired,
};
