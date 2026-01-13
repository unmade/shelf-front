import type { IMediaItem } from '@/types/photos';

import { Button } from '@/ui/button';

import { useFavouriteAction } from '@/components/photos/hooks/media-item-actions';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function FavouriteButton({ className = '', mediaItem }: Props) {
  const { name, Icon, onClick } = useFavouriteAction([mediaItem]);

  return (
    <Button className={className} title={name} variant="ghost" size="icon" onClick={onClick}>
      <Icon />
    </Button>
  );
}
