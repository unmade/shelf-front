import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { MEGABYTE } from '../../../../filesize';

import { useDownloadSharedLinkContentQuery } from '../../../../store/sharing';

import Spinner from '../../../../components/ui-legacy/Spinner';

import NoPreview from './NoPreview';
import { SharedLinkFileShape } from '../../../../types';

const MAX_SIZE = 9 * MEGABYTE;

function PDFPreview({ file, token }) {
  const { t } = useTranslation(['filePreview']);

  const shouldSkip = file.size > MAX_SIZE;
  const { data, isLoading: loading } = useDownloadSharedLinkContentQuery(
    { token, filename: file.name },
    {
      skip: shouldSkip,
    },
  );

  if (shouldSkip) {
    return <NoPreview token={token} file={file} reason={t('filePreview:fileTooLarge')} />;
  }

  if (loading) {
    return <Spinner className="h-full w-full" />;
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
  file: SharedLinkFileShape.isRequired,
  token: PropTypes.string.isRequired,
};

export default PDFPreview;
