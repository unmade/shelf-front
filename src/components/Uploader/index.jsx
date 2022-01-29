import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery } from '../../constants';
import * as icons from '../../icons';

import Overlay from '../../containers/Uploader/Overlay';

import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

import UploadDialog from './UploadDialog';

function Uploader() {
  const [uploaderVisible, setUploaderVisible] = React.useState(false);
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

  if (isLaptop) {
    return (
      <Dropdown overlay={Overlay}>
        <Button
          as="div"
          type="primary"
          title="Uploads"
          size="lg"
          icon={<icons.CloudUploadOutlined className="h-5 w-5 shrink-0" />}
        />
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

export default Uploader;
