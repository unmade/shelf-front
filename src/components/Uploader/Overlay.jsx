import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import * as icons from '../../icons';

import FileDrop from '../../containers/FileDrop';

import RecentUploads from '../../containers/Uploader/RecentUploads';
import UploadButton from '../../containers/Uploader/UploadButton';

const dropzoneClass = [
  'p-4',
  'border-2',
  'border-dashed',
  'rounded-md',
  'flex',
  'flex-row',
  'items-center',
  'justify-center',
  'space-x-6',
  'transition',
  'ease-in',
  'duration-75',
].join(' ');

function Dropzone({ dragging }) {
  const { t } = useTranslation();

  let classes;
  if (dragging) {
    classes = 'border-blue-400 bg-blue-100';
  } else {
    classes = 'bg-gray-100';
  }
  return (
    <div className={`${dropzoneClass} ${classes}`}>
      <icons.CloudUploadOutlined className="h-12 w-12 text-gray-400" />
      <div className="flex flex-col text-center">
        <p className="text-sm font-semibold text-gray-600">{t('Drag files here')}</p>
        <p className="text-sm text-gray-400">{t('or')}</p>
        <UploadButton icon={<icons.Upload />}>{t('Browse')}</UploadButton>
      </div>
    </div>
  );
}

Dropzone.propTypes = {
  dragging: PropTypes.bool,
};

Dropzone.defaultProps = {
  dragging: false,
};

function Overlay({ uploadTo }) {
  return (
    <div className="w-96 rounded bg-white p-4 text-gray-700 shadow">
      <FileDrop uploadTo={uploadTo} className="w-full" render={Dropzone} />

      <RecentUploads />
    </div>
  );
}

Overlay.propTypes = {
  uploadTo: PropTypes.string.isRequired,
};

export default Overlay;
