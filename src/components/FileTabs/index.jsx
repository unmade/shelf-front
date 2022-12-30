import React from 'react';

import { useTranslation } from 'react-i18next';

import { FileShape } from '../../types';

import Tabs from '../ui/Tabs';

import FileTabPanels from '../FileTabPanels';

import ExifPanelContainer from './ExifPanelContainer';

function FileTabs({ file }) {
  const { t } = useTranslation('file');

  const { path, thumbnail_url: thumbnailUrl } = file;

  const tabs = [
    {
      name: t('file:information'),
      renderer: <FileTabPanels.Information file={file} />,
    },
    {
      name: t('file:exif'),
      renderer: <ExifPanelContainer path={path} thumbnailUrl={thumbnailUrl} />,
    },
  ];

  return <Tabs tabs={tabs} />;
}

FileTabs.propTypes = {
  file: FileShape.isRequired,
};

export default FileTabs;
