import { useListFileMembersQuery } from '@/store/sharing';

import { Avatar, AvatarFallback } from '@/ui/avatar';

import FileMemberAccessLevel from './FileMemberAccessLevel';

interface Props {
  fileId: string;
  memberId: string;
}

export default function FileMemberItem({ fileId, memberId }: Props) {
  const { member } = useListFileMembersQuery(fileId, {
    selectFromResult: ({ data }) => ({ member: data?.entities[memberId] }),
  });

  if (!member) {
    return null;
  }

  const { display_name: displayName } = member;

  return (
    <div className="flex items-center justify-between px-1 py-3 text-sm font-medium dark:text-zinc-200">
      <div className="mr-2 flex min-w-0 items-center">
        <Avatar className="size-9">
          <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="ml-2 truncate">{displayName}</p>
      </div>
      <div>
        <FileMemberAccessLevel member={member} />
      </div>
    </div>
  );
}
