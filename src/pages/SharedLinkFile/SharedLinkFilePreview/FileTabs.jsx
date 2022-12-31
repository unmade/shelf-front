import React from 'react';

import { useTranslation } from 'react-i18next';

import { FileShape } from '../../../types';

import Tabs from '../../../components/ui/Tabs';

import FileTabPanels from '../../../components/FileTabPanels';

function FileTabs({ file }) {
  const { t } = useTranslation('file');

  const tabs = [
    {
      name: t('file:information'),
      renderer: <FileTabPanels.Information file={file} />,
    },
  ];

  return <Tabs tabs={tabs} />;
}

FileTabs.propTypes = {
  file: FileShape.isRequired,
};

export default FileTabs;
