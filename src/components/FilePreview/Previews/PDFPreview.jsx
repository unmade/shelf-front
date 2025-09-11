import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { MEGABYTE } from 'components/ui/FileSize';

import { useDownloadContentQuery } from '../../../store/files';

import Loader from '../Loader';

import NoPreview from './NoPreview';

const MAX_SIZE = 9 * MEGABYTE;

function PDFPreview({ file }) {
  const { t } = useTranslation(['filePreview']);

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadContentQuery(file.path, { skip: shouldSkip });

  if (shouldSkip) {
    return <NoPreview file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <object
      data={data?.content}
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
