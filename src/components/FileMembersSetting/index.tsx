import { useTranslation } from 'react-i18next';

import AddFileMemberForm from './AddFileMemberForm';
import FileMembers from './FileMembers';

interface Props {
  fileId: string;
}

export default function FileMembersSetting({ fileId }: Props) {
  const { t } = useTranslation('fileMembersSetting');

  return (
    <>
      <div>
        <p className="mt-6 mb-1 text-sm font-semibold dark:text-zinc-200">
          {t('title', { defaultValue: 'Share with members' })}
        </p>
      </div>
      <div>
        <AddFileMemberForm fileId={fileId} />
      </div>

      <FileMembers fileId={fileId} />
    </>
  );
}
