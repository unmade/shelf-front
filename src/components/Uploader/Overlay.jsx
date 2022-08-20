import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getCurrentPath } from '../../store/reducers/ui';

import * as icons from '../../icons';

import FileDrop from '../../containers/FileDrop';
import UploadButton from '../../containers/Uploader/UploadButton';

import RecentUploads from './RecentUploads';

const dropzoneClass = [
  'p-4',
  'border-2',
  'border-dashed',
  'rounded-xl',
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
  const { t } = useTranslation(['translation', 'uploads']);

  let bg;
  let textPrimary;
  let textSecondary;
  if (dragging) {
    bg = 'border-teal-200 bg-teal-50';
    textPrimary = 'text-teal-700';
    textSecondary = 'text-teal-600';
  } else {
    bg = 'bg-gray-50';
    textPrimary = 'text-gray-600';
    textSecondary = 'text-gray-400';
  }
  return (
    <div className={`${dropzoneClass} ${bg}`}>
      <icons.CloudUploadOutlined className={`h-12 w-12 ${textSecondary}`} />
      <div className="flex flex-col space-y-1 text-center text-sm font-semibold">
        <p className={textPrimary}>{t('uploads:dropzone.title')}</p>
        <p className={textSecondary}>{t('or')}</p>
        <UploadButton icon={<icons.Upload />}>{t('uploads:uploadButton.title')}</UploadButton>
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

function Overlay() {
  const currentPath = useSelector(getCurrentPath);

  return (
    <div className="w-96 rounded-2xl bg-white p-4 text-gray-700 shadow">
      <FileDrop uploadTo={currentPath} className="w-full" render={Dropzone} />
      <RecentUploads />
    </div>
  );
}

Overlay.propTypes = {};

export default Overlay;
