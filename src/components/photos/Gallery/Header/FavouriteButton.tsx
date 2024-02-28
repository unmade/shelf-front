import React from 'react';

import { IMediaItem } from 'types/photos';

import { useFavouriteAction } from 'components/photos/hooks/media-item-actions';

import Button from 'components/ui/Button';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function FavouriteButton({ className = '', mediaItem }: Props) {
  const { name, Icon, onClick } = useFavouriteAction([mediaItem]);

  return (
    <Button
      className={className}
      title={name}
      variant="text"
      size="base"
      icon={<Icon className="h-5 w-5 shrink-0" />}
      onClick={onClick}
    />
  );
}
