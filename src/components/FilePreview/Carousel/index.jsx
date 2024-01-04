import React from 'react';
import PropTypes from 'prop-types';

import { FileShape } from '../../../types';

import Preview from '../Previews';

import useCarousel from './hooks/useCarousel';

function Carousel({ files, onSwipeLeft, onSwipeRight }) {
  const [handlers, style] = useCarousel({
    length: files.length,
    onSwipeLeft,
    onSwipeRight,
  });

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...handlers}
      className="overflow-hidden w-full"
    >
      <div style={{ ...style }} className="relative h-[calc(100vh-60px)] flex overflow-x-scroll">
        {files.map(
          (f) =>
            f != null && (
              <div key={f.path} className="p-4 shrink-0 w-1/3">
                <Preview file={f} />
              </div>
            )
        )}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
};

export default Carousel;
