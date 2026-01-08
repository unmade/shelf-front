import React from 'react';

import { useTranslation } from 'react-i18next';

import { MediaType } from '@/constants';
import * as routes from '@/routes';
import { FileShape } from '@/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

import FileTabPanels from '../FileTabPanels';

import ExifPanelContainer from './ExifPanelContainer';

function FileTabs({ file }) {
  const { t } = useTranslation('file');

  const { path, thumbnail_url: thumbnailUrl } = file;

  const tabs = [
    {
      key: 'info',
      name: t('file:information'),
      renderer: <FileTabPanels.Information file={file} />,
    },
  ];

  if (MediaType.isImage(file.mediatype) && thumbnailUrl != null) {
    tabs.push({
      key: 'exif',
      name: t('file:exif'),
      renderer: <ExifPanelContainer fileId={file.id} thumbnailUrl={thumbnailUrl} />,
    });
  }

  if (!routes.isTrashed(path)) {
    tabs.push({
      key: 'sharing',
      name: t('file:sharing'),
      renderer: <FileTabPanels.Sharing file={file} />,
    });
  }

  return (
    <Tabs defaultValue={tabs[0].key} className="w-full">
      <TabsList className="w-full">
        {tabs.map(({ key, name }) => (
          <TabsTrigger key={key} value={key}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ key, renderer }) => (
        <TabsContent key={key} value={key}>
          {renderer}
        </TabsContent>
      ))}
    </Tabs>
  );
}

FileTabs.propTypes = {
  file: FileShape.isRequired,
};

export default FileTabs;
