import type { IMediaItem } from '@/types/photos';

import * as icons from '@/icons';

import { Button } from '@/ui/button';

import { useCopyLinkDialog } from '@/apps/files/components/dialogs';

import useFileFromMediaItem from '@/components/photos/hooks/file-from-media-item';

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
      variant="ghost"
      size="icon"
      onClick={() => {
        openDialog(file);
      }}
    >
      <icons.LinkOutlined />
    </Button>
  );
}
