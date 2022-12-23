import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectIsUploading, selectVisibleUploadsLength } from '../../store/uploads';

import { useIsLaptop } from '../../hooks/media-query';

import * as icons from '../../icons';

import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

import Overlay from './Overlay';
import UploadDialog from './UploadDialog';

const buttonClasses = [
  'animate-gradient bg-gradient-to-br',
  'from-indigo-400 via-purple-400 to-blue-400',
  'bg-[length:400%_400%]',
  'hover:from-indigo-300 hover:via-purple-300 hover:to-blue-300',
].join(' ');

const DropdownButton = React.forwardRef(({ uploading }, ref) => (
  <Button
    innerRef={ref}
    className={uploading ? buttonClasses : ''}
    as="div"
    type="primary"
    title="Uploads"
    size="lg"
    icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
  />
));

DropdownButton.propTypes = {};

function UploaderDropdown({ uploadTo }) {
  const [open, setOpen] = React.useState(false);
  const uploading = useSelector(selectIsUploading);
  const uploadCounter = useSelector((state) => selectVisibleUploadsLength(state, 'all'));
  const buttonRef = React.useRef();

  React.useEffect(() => {
    if (uploadCounter > 0 && !open) {
      buttonRef.current?.click();
    }
  }, [uploadCounter]);

  return (
    <Dropdown overlay={() => <Overlay uploadTo={uploadTo} />} onOpenChange={setOpen}>
      <DropdownButton uploading={uploading} ref={buttonRef} />
    </Dropdown>
  );
}

UploaderDropdown.propTypes = {
  uploadTo: PropTypes.string.isRequired,
};

function UploaderDialog({ uploadTo }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button
        as="div"
        type="primary"
        title="Uploads"
        size="base"
        icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
        onClick={() => {
          setVisible(true);
        }}
      />
      <UploadDialog
        uploadTo={uploadTo}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}

UploaderDialog.propTypes = {
  uploadTo: PropTypes.string.isRequired,
};

function Uploader({ uploadTo }) {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return <UploaderDropdown uploadTo={uploadTo} />;
  }
  return <UploaderDialog uploadTo={uploadTo} />;
}

Uploader.propTypes = {
  uploadTo: PropTypes.string.isRequired,
};

export default Uploader;
