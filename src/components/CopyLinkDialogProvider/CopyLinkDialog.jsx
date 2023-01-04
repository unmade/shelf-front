import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  useRevokeSharedLinkMutation,
} from '../../store/sharing';

import * as icons from '../../icons';
import * as routes from '../../routes';
import { FileShape } from '../../types';

import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';
import Switch from '../ui/Switch';

const PENDING = 'pending';
const COPIED = 'copied';

function CopyToClipboardButton({ text, disabled }) {
  const [state, setState] = React.useState(PENDING);

  React.useEffect(() => {
    let timeout = null;
    if (state === COPIED) {
      timeout = setTimeout(() => {
        setState(PENDING);
      }, 2500);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const onClick = (event) => {
    event.preventDefault();
    if (text != null && text !== '') {
      navigator.clipboard?.writeText(text);
    }
    setState(COPIED);
  };

  const icon =
    state === COPIED ? (
      <icons.Check className="h-5 w-7 shrink-0 text-teal-400 dark:text-teal-500" />
    ) : (
      <icons.ClipboardCopyOutlined className="h-5 w-7 shrink-0 text-gray-400 dark:text-zinc-400" />
    );

  const borders =
    state === COPIED
      ? 'focus:ring-teal-300 border-teal-200 dark:focus:ring-teal-700 dark:border-teal-600 z-30'
      : '';

  return (
    <Button
      className={borders}
      type="default"
      icon={icon}
      onClick={onClick}
      disabled={disabled || navigator.clipboard == null}
    />
  );
}

CopyToClipboardButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

CopyToClipboardButton.defaultProps = {
  text: null,
  disabled: false,
};

function makeLink(token, filename) {
  if (token == null || filename == null) {
    return null;
  }
  const pathParams = { token, filename: routes.encodePath(filename) };
  const pathname = generatePath(routes.SHARED_LINK_FILE.route, pathParams);
  return `${window.location.origin}${pathname}`;
}

const initialState = { enabled: false, link: null };

function CopyLinkDialog({ file, visible, onClose }) {
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
      const { data: createdLink } = await createSharedLink(file?.path);
      setState({
        enabled: true,
        token: createdLink.token,
      });
    } else {
      try {
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

  const closeDialog = () => {
    onClose();
  };

  const onConfirm = () => {
    onClose();
  };

  const { enabled, token } = state;
  const link = makeLink(token, file?.name);

  return (
    <Dialog
      title={t('Share read-only link')}
      icon={<icons.LinkOutlined className="h-6 w-6" />}
      visible={visible}
      confirmTitle={t('Done')}
      confirmLoading={false}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      <form
        className="my-4 min-w-[20rem]"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <div className="flex mb-4 space-x-4 items-center justify-between">
          <div className="text-left">
            <p className="font-semibold text-sm">Public link is on</p>
            <p className="text-xs">
              <Trans i18nKey="copy_link_dialog_text" t={t}>
                Anyone with this link <b>can view</b>
              </Trans>
            </p>
          </div>
          <Switch enabled={enabled} setEnabled={toggleLink} />
        </div>
        <div>
          <InputGroup>
            <Input
              id="link"
              key={link ?? ''}
              placeholder={`${window.location.origin}/s/...`}
              defaultValue={link ?? ''}
              size="sm"
              onChange={() => {}}
              disabled={link == null}
              readOnly
            />
            <CopyToClipboardButton text={link} disabled={link == null} />
          </InputGroup>
        </div>
      </form>
    </Dialog>
  );
}

CopyLinkDialog.propTypes = {
  file: FileShape,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

CopyLinkDialog.defaultProps = {
  file: null,
};

export default CopyLinkDialog;
