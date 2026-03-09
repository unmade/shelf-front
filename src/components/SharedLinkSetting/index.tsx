import { useCallback, useEffect, useState } from 'react';

import { Trans, useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

import {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  useRevokeSharedLinkMutation,
} from '@/store/sharedLinks';

import { useSharedLink } from '@/hooks/shared-link';

import { ButtonGroup } from '@/ui/button-group';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';

import CopyToClipboardButton from '@/components/CopyToClipboardButton';

function useToggleSharedLink(fileId: string) {
  const [token, setToken] = useState<string | null>(null);

  const { sharedLink } = useGetSharedLinkQuery(fileId, {
    selectFromResult: ({ data }) => ({ sharedLink: data }),
  });

  const [createSharedLink, { isLoading: creating }] = useCreateSharedLinkMutation();
  const [revokeSharedLink, { isLoading: revoking }] = useRevokeSharedLinkMutation();

  useEffect(() => {
    setToken(sharedLink?.token ?? null);
  }, [sharedLink?.token]);

  const toggleLink = useCallback(async () => {
    if (token == null) {
      try {
        const result = await createSharedLink(fileId).unwrap();
        setToken(result.token);
      } catch {
        // empty
      }
    } else {
      try {
        await revokeSharedLink({
          token,
          fileId: fileId,
        }).unwrap();
        setToken(null);
      } catch {
        // empty
      }
    }
  }, [fileId, token, createSharedLink, revokeSharedLink]);

  return {
    token,
    toggleLink,
    loading: creating || revoking,
  };
}

interface Props {
  file: IFile;
}

export default function SharedLinkSetting({ file }: Props) {
  const { t } = useTranslation('files');

  const { token, toggleLink, loading } = useToggleSharedLink(file.id);

  const enabled = token != null;
  const link = useSharedLink({ token, filename: file.name });
  return (
    <>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="switch-public-link">
            {t('forms.sharedLink.fields.link.label', { defaultValue: 'Public link' })}
          </FieldLabel>
          <FieldDescription className="text-xs">
            <Trans i18nKey="forms.sharedLink.fields.link.description" t={t}>
              Anyone with this link <b>can view</b>
            </Trans>
          </FieldDescription>
        </FieldContent>
        <Switch
          id="switch-public-link"
          checked={enabled}
          disabled={loading}
          onCheckedChange={toggleLink}
        />
      </Field>
      <ButtonGroup className="mt-1.5 w-full">
        <Input
          id="link"
          key={link ?? ''}
          placeholder={`${window.location.origin}/s/...`}
          defaultValue={link ?? ''}
          onChange={undefined}
          disabled={link == null}
          readOnly
        />
        <CopyToClipboardButton
          title={t('forms.sharedLink.buttons.copyToClipboard', {
            defaultValue: 'Copy to clipboard',
          })}
          value={link}
          disabled={link == null}
        />
      </ButtonGroup>
    </>
  );
}
