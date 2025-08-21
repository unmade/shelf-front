import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks';
import * as icons from 'icons';
import type { IFile } from 'types/files';

import { selectIsSuperuser } from 'store/accounts';
import { selectFeatureSharedLinksEnabled } from 'store/features';

import Dialog from 'components/ui-legacy/Dialog';

import SharedLinkSetting from 'components/SharedLinkSetting';

interface Props {
  file: IFile | null;
  visible: boolean;
  onClose: () => void;
}

function CopyLinkDialog({ file, visible, onClose }: Props) {
  const { t } = useTranslation();

  const superuser = useAppSelector(selectIsSuperuser);
  const sharingEnabled = useAppSelector(selectFeatureSharedLinksEnabled);

  const Icon = sharingEnabled ? icons.LockClosedOutlined : icons.LinkOutlined;

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = () => {
    onClose();
  };

  return (
    <Dialog
      title={t('Share read-only link')}
      icon={<Icon className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Done')}
      confirmLoading={false}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      {!sharingEnabled && !superuser ? (
        'Sharing is temporarily disabled for your account'
      ) : (
        <div className="my-4 lg:min-w-[20rem]">{file && <SharedLinkSetting file={file} />}</div>
      )}
    </Dialog>
  );
}

export default CopyLinkDialog;
