import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { useGetSharedLinkFileQuery } from '@/store/sharedLinks';

import { SharedLinkPreview } from '@/apps/files/components/shared-link-preview';

export default function SharedLinkFile() {
  const { token, filename } = useParams();

  const { data: file, isFetching: loading } = useGetSharedLinkFileQuery(
    token && filename ? { token, filename } : skipToken,
    { selectFromResult: ({ data, isFetching }) => ({ data, isFetching }) },
  );

  return (
    <>
      <Helmet>
        <title>{file?.name ?? 'Shelf'}</title>
      </Helmet>
      <SharedLinkPreview file={file} token={token ?? ''} loading={loading} />
    </>
  );
}
