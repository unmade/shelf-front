import React from 'react';

import { useTranslation } from 'react-i18next';

import { MediaType } from '../../constants';
import * as routes from '../../routes';
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
  ];

  if (MediaType.isImage(file.mediatype) && thumbnailUrl != null) {
    tabs.push({
      name: t('file:exif'),
      renderer: <ExifPanelContainer fileId={file.id} thumbnailUrl={thumbnailUrl} />,
    });
  }

  if (!routes.isTrashed(path)) {
    tabs.push({
      name: t('file:sharing'),
      renderer: <FileTabPanels.Sharing file={file} />,
    });
  }

  return <Tabs tabs={tabs} />;
}

FileTabs.propTypes = {
  file: FileShape.isRequired,
};

export default FileTabs;
