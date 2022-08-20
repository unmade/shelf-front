import React from 'react';

import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getIsUploading } from '../../store/reducers/uploads';

import { MediaQuery } from '../../constants';
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

function DropdownButton() {
  const uploading = useSelector(getIsUploading);

  return (
    <Button
      className={uploading ? buttonClasses : ''}
      as="div"
      type="primary"
      title="Uploads"
      size="lg"
      icon={<icons.CloudUploadOutlined className="h-5 w-5 shrink-0" />}
    />
  );
}

DropdownButton.propTypes = {};

function Uploader() {
  const [uploaderVisible, setUploaderVisible] = React.useState(false);
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

  if (isLaptop) {
    return (
      <Dropdown overlay={Overlay}>
        <DropdownButton />
      </Dropdown>
    );
  }

  return (
    <>
      <Button
        as="div"
        type="primary"
        title="Uploads"
        size="base"
        icon={<icons.CloudUploadOutlined className="h-5 w-5 shrink-0" />}
        onClick={() => {
          setUploaderVisible(true);
        }}
      />
      <UploadDialog
        visible={uploaderVisible}
        onCancel={() => {
          setUploaderVisible(false);
        }}
      />
    </>
  );
}

Uploader.propTypes = {};

export default Uploader;
