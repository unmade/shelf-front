import React from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  useRevokeSharedLinkMutation,
} from '../../store/sharing';

import * as routes from '../../routes';
import { FileShape } from '../../types';

import Input from '../ui/Input';
import Switch from '../ui/Switch';

import CopyToClipboardButton from './CopyToClipboardButton';

function makeLink(token, filename) {
  if (token == null || filename == null) {
    return null;
  }
  const pathParams = { token, filename: routes.encodePath(filename) };
  const pathname = generatePath(routes.SHARED_LINK_FILE.route, pathParams);
  return `${window.location.origin}${pathname}`;
}

const initialState = { enabled: false, link: null };

function SharedLinkSetting({ file }) {
  const { t } = useTranslation();

  const { currentData: sharedLink } = useGetSharedLinkQuery(file?.path, { skip: file == null });
  const [createSharedLink] = useCreateSharedLinkMutation();
  const [revokeSharedLink] = useRevokeSharedLinkMutation();

  // ideally we would like to rely only on the `currentData`, but in some rare cases
  // it is not being updated by `createSharedLink` mutation
  const [state, setState] = React.useState(initialState);
  React.useEffect(() => {
    setState({
      enabled: sharedLink?.token != null,
      token: sharedLink?.token,
    });
  }, [sharedLink?.token, file?.name, setState]);

  const toggleLink = React.useCallback(async () => {
    if (state.token == null) {
      setState({ enabled: true, token: null });
      const { data: createdLink } = await createSharedLink(file?.path);
      setState({ enabled: true, token: createdLink.token });
    } else {
      try {
        setState({ enabled: false, token: state.token });
        await revokeSharedLink({
          token: state.token,
          filename: file?.name,
          path: file?.path,
        }).unwrap();
        setState({ enabled: false, token: null });
      } catch (err) {
        //
      }
    }
  }, [state.token, file?.name, file?.path]);

  const { enabled, token } = state;
  const link = makeLink(token, file?.name);

  return (
    <>
      <div className="flex mb-2 space-x-4 items-center justify-between">
        <div className="text-left">
          <p className="font-semibold text-sm">{t('Public link')}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            <Trans i18nKey="Anyone with this link can view" t={t}>
              Anyone with this link <b>can view</b>
            </Trans>
          </p>
        </div>
        <Switch size="sm" enabled={enabled} setEnabled={toggleLink} />
      </div>
      <div className="relative">
        <div>
          <Input
            id="link"
            key={link ?? ''}
            variant="filled"
            placeholder={`${window.location.origin}/s/...`}
            defaultValue={link ?? ''}
            size="xs"
            onChange={() => {}}
            disabled={link == null}
            readOnly
          />
        </div>
        <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-1">
          <CopyToClipboardButton text={link} disabled={link == null} />
        </span>
      </div>
    </>
  );
}

SharedLinkSetting.propTypes = {
  file: FileShape,
};

SharedLinkSetting.defaultProps = {
  file: null,
};

export default SharedLinkSetting;
