import React from 'react';

import * as icons from 'icons';

import Button from 'components/ui/Button';

import UploadDialog from './UploadDialog';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
}

export default function UploaderDialog({ allowedMediaTypes, uploadTo }: Props) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button
        as="div"
        variant="primary"
        title="Uploads"
        size="base"
        icon={<icons.CloudUpload className="h-5 w-5 shrink-0" />}
        onClick={() => {
          setVisible(true);
        }}
      />
      <UploadDialog
        allowedMediaTypes={allowedMediaTypes}
        uploadTo={uploadTo}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
