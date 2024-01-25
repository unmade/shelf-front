import React from 'react';

import { IMediaItem } from 'types/photos';

import { useFavouriteAction } from 'hooks/file-actions';

import Button from 'components/ui/Button';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function FavouriteButton({ className = '', mediaItem }: Props) {
  const file = useFileFromMediaItem(mediaItem);
  const { name, Icon, onClick } = useFavouriteAction([file]);

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
