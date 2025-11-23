import { useCallback } from 'react';

import { Trans, useTranslation } from 'react-i18next';

import useSharedLink from 'hooks/shared-link';

import type { IFile } from 'types/files';

import {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  useRevokeSharedLinkMutation,
} from 'store/sharedLinks';

import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';

import CopyToClipboardButton from 'components/CopyToClipboardButton';

function useToggleSharedLink(fileId: string) {
  const { data: sharedLink } = useGetSharedLinkQuery(fileId);
  const [createSharedLink, { isLoading: creating }] = useCreateSharedLinkMutation();
  const [revokeSharedLink, { isLoading: revoking }] = useRevokeSharedLinkMutation();

  const toggleLink = useCallback(async () => {
    if (sharedLink?.token == null) {
      try {
        await createSharedLink(fileId).unwrap();
      } catch {
        // empty
      }
    } else {
      try {
        await revokeSharedLink({
          token: sharedLink.token,
          fileId: fileId,
        }).unwrap();
      } catch {
        // empty
      }
    }
  }, [sharedLink?.token, fileId, createSharedLink, revokeSharedLink]);

  return {
    sharedLink,
    toggleLink,
    loading: creating || revoking,
  };
}

interface Props {
  file: IFile;
}

export default function SharedLinkSetting({ file }: Props) {
  const { t } = useTranslation('sharedLinkSetting');

  const { sharedLink, toggleLink, loading } = useToggleSharedLink(file.id);

  const token = sharedLink?.token;
  const enabled = token != null;
  const link = useSharedLink({ token, filename: file.name });

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-x-4">
        <div className="text-left">
          <p className="text-sm font-semibold">
            {t('publicLink', { defaultValue: 'Public link' })}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            <Trans i18nKey="anyoneCanViewLink" t={t}>
              Anyone with this link <b>can view</b>
            </Trans>
          </p>
        </div>
        <Switch checked={enabled} disabled={loading} onCheckedChange={toggleLink} />
      </div>
      <div className="relative">
        <div>
          <Input
            id="link"
            key={link ?? ''}
            placeholder={`${window.location.origin}/s/...`}
            defaultValue={link ?? ''}
            onChange={undefined}
            disabled={link == null}
            readOnly
          />
        </div>
        <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-1">
          <CopyToClipboardButton
            title={t('copyToClipboardBtn.title', { defaultValue: 'Copy to clipboard' })}
            value={link}
            disabled={link == null}
          />
        </span>
      </div>
    </>
  );
}
