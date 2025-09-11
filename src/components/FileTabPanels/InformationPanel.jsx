import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import FileSize from 'components/ui/FileSize';

import { FileShape, SharedLinkFileShape } from '../../types';

import TimeAgo from '../ui-legacy/TimeAgo';

import Property from './Property';

function InformationPanel({ file }) {
  const { t } = useTranslation('file');

  return (
    <div className="divide-y divide-gray-200 text-xs font-medium dark:divide-zinc-700">
      <Property name={t('file:size')} value={<FileSize bytes={file.size} />} />
      <Property
        name={t('file:created')}
        value={<TimeAgo value={file.modified_at} format="LLL" />}
      />
      <Property
        name={t('file:modified')}
        value={<TimeAgo value={file.modified_at} format="LLL" />}
      />
    </div>
  );
}

InformationPanel.propTypes = {
  file: PropTypes.oneOfType([FileShape, SharedLinkFileShape]).isRequired,
};

export default InformationPanel;
