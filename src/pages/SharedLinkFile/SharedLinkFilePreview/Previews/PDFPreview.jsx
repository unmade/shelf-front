import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { SharedLinkFileShape } from '@/types';

import { useDownloadSharedLinkContentQuery } from '@/store/sharedLinks';

import { MEGABYTE } from '@/ui/filesize';
import { Spinner } from '@/ui/spinner';

import NoPreview from './NoPreview';

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
