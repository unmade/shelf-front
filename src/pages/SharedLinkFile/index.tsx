import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { useGetSharedLinkFileQuery } from '@/store/sharedLinks';

import SharedLinkFilePreview from './SharedLinkFilePreview';

function PublicView() {
  const { token, filename } = useParams();

  const { data: file, isFetching: loading } = useGetSharedLinkFileQuery(
    token && filename ? { token, filename } : skipToken,
  );

  return (
    <>
      <Helmet>
        <title>{file?.name ?? 'Shelf'}</title>
      </Helmet>
      <SharedLinkFilePreview token={token} file={file} loading={loading} />;
    </>
  );
}

export default PublicView;
