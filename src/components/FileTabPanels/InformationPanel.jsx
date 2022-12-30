import React from 'react';

import { useTranslation } from 'react-i18next';

import { FileShape } from '../../types';

import FileSize from '../ui/FileSize';
import TimeAgo from '../ui/TimeAgo';

import Property from './Property';

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

export default InformationPanel;
