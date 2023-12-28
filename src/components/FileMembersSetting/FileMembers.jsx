import React from 'react';
import PropTypes from 'prop-types';

import { useListFileMembersQuery } from '../../store/sharing';

import FileMemberItem from './FileMemberItem';

function FileMembers({ fileId }) {
  const { ids } = useListFileMembersQuery(fileId, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return (
    <div className="mt-3 divide-y divide-gray-100 dark:divide-zinc-700 max-h-[50dvh] overflow-scroll">
      {ids?.map((memberId) => (
        <FileMemberItem key={memberId} fileId={fileId} memberId={memberId} />
      ))}
    </div>
  );
}

FileMembers.propTypes = {
  fileId: PropTypes.string.isRequired,
};

export default FileMembers;
