import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

import Button from '../ui/Button';

function Header({ idx, total, name, onGoBack, onNext, onPrev }) {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-3">
      <div className="flex flex-row sm:w-48">
        <Button
          type="text"
          size="base"
          icon={<icons.ChevronLeftOutlined className="h-5 w-5" />}
          onClick={onGoBack}
        />
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8">
        <p className="truncate text-left text-sm font-bold sm:text-center sm:text-lg">{name}</p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end space-x-2 text-gray-800 sm:w-48">
        <Button
          type="text"
          size="base"
          icon={<icons.ArrowNarrowLeftOutlined className="h-5 w-5" />}
          onClick={onPrev}
        />

        <div className="text-sm text-gray-700">
          <span>{idx + 1}</span>
          <span> / </span>
          <span>{total}</span>
        </div>

        <Button
          type="text"
          size="base"
          icon={<icons.ArrowNarrowRightOutlined className="h-5 w-5" />}
          onClick={onNext}
        />
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  idx: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};
