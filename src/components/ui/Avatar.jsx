import React from 'react';
import PropTypes from 'prop-types';

const blue =
  'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-700/30 dark:text-blue-300';
const indigo =
  'border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-700/30 dark:text-indigo-300';
const purple =
  'border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-700/30 dark:text-purple-300';
const rose =
  'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-700/30 dark:text-rose-300';
const orange =
  'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800 dark:bg-orange-700/30 dark:text-orange-300';

const colors = {
  a: rose,
  b: indigo,
  c: blue,
  d: orange,
  e: purple,
  f: orange,
  g: indigo,
  h: rose,
  i: purple,
  j: orange,
  k: blue,
  l: indigo,
  m: orange,
  n: purple, // indigo?
  o: blue,
  p: rose,
  q: purple,
  r: indigo,
  s: rose,
  t: indigo,
  u: purple,
  v: indigo,
  w: orange,
  x: rose,
  y: purple,
  z: indigo,
};

function Avatar({ className, username }) {
  // const idx = Math.abs(hashCode(username) % colors.length);
  const letter = username.substring(0, 1);
  const color = colors[letter.toLowerCase()];
  return (
    <div
      className={`${className} mx-0 flex items-center justify-center rounded-xl border ${color} lg:mx-auto xl:mx-0`}
    >
      {letter.toUpperCase()}
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  className: '',
};

export default Avatar;
