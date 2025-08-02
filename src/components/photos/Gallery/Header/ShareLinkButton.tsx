import type { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import Button from 'components/ui-legacy/Button';

import { useCopyLinkDialog } from 'components/CopyLinkDialogProvider';

import useFileFromMediaItem from 'components/photos/hooks/file-from-media-item';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function ShareLinkButton({ className = '', mediaItem }: Props) {
  const file = useFileFromMediaItem(mediaItem);
  const { openDialog } = useCopyLinkDialog();

  return (
    <Button
      className={className}
      title="Move to Trash"
      variant="text"
      size="base"
      icon={<icons.LinkOutlined className="h-5 w-5" />}
      onClick={() => {
        openDialog(file);
      }}
    />
  );
}
