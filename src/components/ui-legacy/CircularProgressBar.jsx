import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
// import { blue, emerald, gray, indigo, orange, red, rose, teal, zinc } from '@tailwindcss';

import usePrefersColorScheme from '../../hooks/prefers-color-scheme';

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
  danger: ['var(--color-red-500)', 'var(--color-rose-500)'],
  idle: ['var(--color-indigo-400)', 'var(--color-blue-400)', 'var(--color-teal-400)'],
  info: ['var(--color-indigo-500)', 'var(--color-blue-500)'],
  success: ['var(--color-teal-500)', 'var(--color-emerald-500)'],
  warning: ['var(--color-orange-500)'],
};

function CircularProgressBar({ children, progress, danger, idle, info, success, warning }) {
  const colorScheme = usePrefersColorScheme();
  const styles = { ...defaultStyles };
  styles.trail.stroke = colorScheme === 'dark' ? 'var(--color-zinc-700)' : 'var(--color-gray-200)';

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
