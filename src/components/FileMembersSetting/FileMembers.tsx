import { useListFileMembersQuery } from '../../store/sharing';

import FileMemberItem from './FileMemberItem';

interface Props {
  fileId: string;
}

export default function FileMembers({ fileId }: Props) {
  const { ids } = useListFileMembersQuery(fileId, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return (
    <div className="mt-3 max-h-[50dvh] divide-y divide-gray-100 overflow-scroll dark:divide-zinc-700">
      {ids?.map((memberId) => (
        <FileMemberItem key={memberId} fileId={fileId} memberId={memberId} />
      ))}
    </div>
  );
}
