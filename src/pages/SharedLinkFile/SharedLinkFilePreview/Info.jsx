import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { downloadSharedLinkFile } from '../../../store/sharing';

import { SharedLinkFileShape } from '../../../types';

import Button from '../../../components/ui/Button';
import TimeAgo from '../../../components/ui/TimeAgo';

import FileTabs from './FileTabs';

function DownloadButton({ filename, token }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(downloadSharedLinkFile({ token, filename }));
  };

  return (
    <Button variant="default" onClick={onClick}>
      {t('Download')}
    </Button>
  );
}

DownloadButton.propTypes = {
  filename: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

function Info({ className, file, token }) {
  return (
    <div className={className}>
      <div className="flex">
        <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
          <p className="truncate text-lg font-semibold">{file.name}</p>
          <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
            <TimeAgo value={file.modified_at} />
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between py-3">
        <DownloadButton filename={file.name} token={token} />
      </div>

      <div className="mt-4">
        <FileTabs file={file} />
      </div>
    </div>
  );
}

Info.propTypes = {
  className: PropTypes.string,
  file: SharedLinkFileShape.isRequired,
  token: PropTypes.string.isRequired,
};

Info.defaultProps = {
  className: '',
};

export default Info;
