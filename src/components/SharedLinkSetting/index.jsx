import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';

import useSharedLink from '../../hooks/shared-link';

import {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  useRevokeSharedLinkMutation,
} from '../../store/sharing';

import Input from '../ui/Input';
import Switch from '../ui/Switch';

import CopyToClipboardButton from '../CopyToClipboardButton';

const initialState = { enabled: false, link: null };

function SharedLinkSetting({ file }) {
  const { t } = useTranslation('sharedLinkSetting');

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
          fileId: file?.id,
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
  const link = useSharedLink({ token, filename: file?.name });

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

SharedLinkSetting.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
};

SharedLinkSetting.defaultProps = {
  file: null,
};

export default SharedLinkSetting;
