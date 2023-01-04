import React from 'react';

import { useParams } from 'react-router-dom';

import { useGetSharedLinkFileQuery } from '../../store/sharing';

import usePrefersColorScheme from '../../hooks/prefers-color-scheme';

import SharedLinkFilePreview from './SharedLinkFilePreview';

function PublicView() {
  usePrefersColorScheme();

  const { token, filename } = useParams();

  const { data: file, isFetching: loading } = useGetSharedLinkFileQuery({ token, filename });

  return <SharedLinkFilePreview token={token} file={file} loading={loading} />;
}

export default PublicView;
