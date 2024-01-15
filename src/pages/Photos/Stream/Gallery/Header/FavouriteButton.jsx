import React from 'react';
import PropTypes from 'prop-types';

import { MediaItemShape } from '../../../../../types';

import { useFavouriteAction } from '../../../../../hooks/file-actions';

import Button from '../../../../../components/ui/Button';

import useFileFromMediaItem from '../../../hooks/file-from-media-item';

function FavouriteButton({ className, mediaItem }) {
  const file = useFileFromMediaItem(mediaItem);
  const { title, Icon, onClick } = useFavouriteAction([file]);

  return (
    <Button
      className={className}
      title={title}
      variant="text"
      size="base"
      icon={<Icon className="h-5 w-5 shrink-0" />}
      onClick={onClick}
    />
  );
}

FavouriteButton.propTypes = {
  className: PropTypes.string,
  mediaItem: MediaItemShape.isRequired,
};

FavouriteButton.defaultProps = {
  className: '',
};

export default FavouriteButton;
