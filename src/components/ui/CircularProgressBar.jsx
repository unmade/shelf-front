import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { blue, emerald, gray, indigo, orange, red, rose, teal, zinc } from 'tailwindcss/colors';

import useColorScheme from '../../hooks/prefers-color-scheme';

import 'react-circular-progressbar/dist/styles.css';

const gradientID = 'circular-progress-bar-gradient';

function Gradient({ colors }) {
  const offset = 100 / colors.length;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={gradientID} gradientTransform="rotate(90)">
          {colors.map((color, idx) => (
            <stop key={color} offset={`${offset * (idx + 1)}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
}

Gradient.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const defaultStyles = {
  root: {},
  path: {
    stroke: `url(#${gradientID})`,
    height: '100%',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease 0s',
  },
  trail: {
    stroke: null, // value depends on the color scheme
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

const defaultVariant = 'info';

const colorsByVariant = {
  danger: [red[500], rose[500]],
  idle: [indigo[400], blue[400], teal[400]],
  info: [indigo[500], blue[500]],
  success: [teal[500], emerald[500]],
  warning: [orange[500]],
};

function CircularProgressBar({ children, progress, danger, idle, info, success, warning }) {
  const colorScheme = useColorScheme();
  const styles = { ...defaultStyles };
  styles.trail.stroke = colorScheme === 'dark' ? zinc[700] : gray[200];

  const variants = { danger, idle, info, success, warning };
  const variant =
    Object.keys(variants).filter((key) => variants[key] === true)[0] ?? defaultVariant;

  return (
    <>
      <Gradient colors={colorsByVariant[variant]} />
      <CircularProgressbarWithChildren value={progress} styles={styles}>
        {children}
      </CircularProgressbarWithChildren>
    </>
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
