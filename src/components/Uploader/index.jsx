import React from 'react';

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

function UploaderDropdown() {
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
    <Dropdown overlay={Overlay} onOpenChange={setOpen}>
      <DropdownButton uploading={uploading} ref={buttonRef} />
    </Dropdown>
  );
}

UploaderDropdown.propTypes = {};

function UploaderDialog() {
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
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}

UploaderDialog.propTypes = {};

function Uploader() {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return <UploaderDropdown />;
  }
  return <UploaderDialog />;
}

Uploader.propTypes = {};

export default Uploader;
