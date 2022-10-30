import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import useFileContent from '../../../hooks/file-content';

import { MEGABYTE } from '../../../filesize';

import Loader from '../Loader';

import NoPreview from './NoPreview';

const MAX_SIZE = 9 * MEGABYTE;

function PDFPreview({ file }) {
  const { t } = useTranslation(['filePreview']);

  const content = useFileContent(file.path, file.size, MAX_SIZE);

  if (file.size > MAX_SIZE) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (content == null) {
    return <Loader />;
  }

  return (
    <object
      data={content}
      type="application/pdf"
      width="100%"
      height="100%"
      aria-label="PDF Preview"
    />
  );
}

PDFPreview.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

export default PDFPreview;
