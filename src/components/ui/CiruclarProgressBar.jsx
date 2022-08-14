import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const defaultStyles = {
  root: {},
  path: {
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease 0s',
  },
  trail: {
    strokeLinecap: 'round',
    transform: 'rotate(0.25turn)',
    transformOrigin: 'center center',
  },
  text: {
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  },
  background: {},
};

const colorByVariant = {
  danger: 'stroke-red-500',
  idle: 'stroke-indigo-500',
  info: 'stroke-indigo-500',
  success: 'stroke-emerald-500',
  warning: 'stroke-orange-500',
};

const DEFAULT_VARIANT = 'info';

function CircularProgressBar({ children, progress, danger, idle, info, success, warning }) {
  const variants = { danger, idle, info, success, warning };
  const variant =
    Object.keys(variants).filter((key) => variants[key] === true)[0] ?? DEFAULT_VARIANT;

  return (
    <CircularProgressbarWithChildren
      value={progress}
      styles={defaultStyles}
      classes={{
        root: 'CircularProgressbar',
        trail: 'stroke-gray-200',
        path: colorByVariant[variant],
        text: 'fill-gray-500',
        background: 'CircularProgressbar-background',
      }}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgressBar;

CircularProgressBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  progress: PropTypes.number.isRequired,
  danger: PropTypes.bool,
  idle: PropTypes.bool,
  info: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
};

CircularProgressBar.defaultProps = {
  danger: false,
  idle: false,
  info: false,
  success: false,
  warning: false,
};
