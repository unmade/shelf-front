import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { downloadSharedLinkFile } from '../../../../store/sharing';

import * as icons from '../../../../icons';
import { SharedLinkFileShape } from '../../../../types';

import Button from '../../../../components/ui/Button';
import FileIcon from '../../../../components/FileIcon';
import FileSize from '../../../../components/ui/FileSize';
import TimeAgo from '../../../../components/ui/TimeAgo';

function NoPreview({ file, reason, token }) {
  const { t } = useTranslation(['translation', 'filePreview']);

  const dispatch = useDispatch();

  const { name, mediatype, hidden, size, mtime } = file;

  const onDownload = () => {
    dispatch(downloadSharedLinkFile({ token, filename: name }));
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <div className="w-1/2 space-y-2 text-center">
        <FileIcon
          className="mx-auto h-auto w-32 drop-shadow-lg"
          mediatype={mediatype}
          hidden={hidden}
        />
        <p className="text-gray-700 dark:text-zinc-200">{name}</p>
        <div className="text-xs text-gray-600 dark:text-zinc-400">
          <FileSize size={size} />
          <span> &bull; </span>
          <TimeAgo mtime={mtime * 1000} />
        </div>
      </div>

      <div className="text-center">
        <p className="mb-4 text-xl font-medium text-gray-700 dark:text-zinc-200">
          {reason || t('filePreview:previewNotAvailable')}
        </p>
        <Button
          type="primary"
          size="base"
          icon={<icons.Download className="h-5 w-5" />}
          onClick={onDownload}
        >
          {t('Download')}
        </Button>
      </div>
    </div>
  );
}

NoPreview.propTypes = {
  file: SharedLinkFileShape.isRequired,
  reason: PropTypes.string,
  token: PropTypes.string.isRequired,
};

NoPreview.defaultProps = {
  reason: '',
};

export default NoPreview;
