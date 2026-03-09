import AddFileMemberForm from './AddFileMemberForm';
import FileMembers from './FileMembers';

interface Props {
  fileId: string;
}

export default function FileMembersSetting({ fileId }: Props) {
  return (
    <>
      <AddFileMemberForm fileId={fileId} />
      <FileMembers fileId={fileId} />
    </>
  );
}
