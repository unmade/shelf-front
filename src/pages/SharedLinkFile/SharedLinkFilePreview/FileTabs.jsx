import React from 'react';

import { useTranslation } from 'react-i18next';

import { SharedLinkFileShape } from '@/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

import FileTabPanels from '@/components/FileTabPanels';

function FileTabs({ file }) {
  const { t } = useTranslation('file');

  const tabs = [
    {
      name: t('file:information'),
      renderer: <FileTabPanels.Information file={file} />,
    },
  ];

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
  file: SharedLinkFileShape.isRequired,
};

export default FileTabs;
