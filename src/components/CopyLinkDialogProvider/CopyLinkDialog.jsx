import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { useCreateSharedLinkMutation } from '../../store/sharing';

import * as icons from '../../icons';
import * as routes from '../../routes';
import { FileShape } from '../../types';

import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import Input from '../ui/Input';
import InputGroup from '../ui/InputGroup';

const PENDING = 'pending';
const COPIED = 'copied';

function CopyToClipboardButton({ text }) {
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
      navigator.clipboard.writeText(text);
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

  return <Button className={borders} type="default" icon={icon} onClick={onClick} />;
}

CopyToClipboardButton.propTypes = {
  text: PropTypes.string,
};

CopyToClipboardButton.defaultProps = {
  text: null,
};

function CopyLinkDialog({ file, visible, onClose }) {
  const { t } = useTranslation();
  const [link, setLink] = React.useState(null);

  const [createSharedLink] = useCreateSharedLinkMutation();

  React.useEffect(() => {
    const createLink = async () => {
      if (file?.path != null) {
        const { data } = await createSharedLink(file.path);
        const pathParams = { token: data.token, filename: routes.encodePath(file.name) };
        const pathname = generatePath(routes.SHARED_LINK_FILE.route, pathParams);
        setLink(`${window.location.origin}${pathname}`);
      }
    };
    createLink();
  }, [file?.name, file?.path, createSharedLink, setLink]);

  const closeDialog = () => {
    onClose();
    setLink(null);
  };

  const onConfirm = async () => {
    onClose();
    setLink(null);
  };

  return (
    <Dialog
      title={t('Public sharing')}
      icon={<icons.LinkOutlined className="h-6 w-6 text-teal-500" />}
      visible={visible}
      confirmTitle={t('Done')}
      confirmLoading={false}
      onConfirm={onConfirm}
      onCancel={closeDialog}
    >
      <p>
        <Trans i18nKey="copy_link_dialog_text" t={t}>
          <b>Anyone</b> with this link <b>can view</b> that file
        </Trans>
      </p>
      <form
        className="my-4 min-w-[20rem]"
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <InputGroup>
          <Input
            id="link"
            placeholder={t('creating a link...')}
            defaultValue={link}
            size="sm"
            onChange={() => {}}
            readOnly
          />
          <CopyToClipboardButton text={link} />
        </InputGroup>
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
