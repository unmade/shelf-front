const red =
  'border-red-200 bg-red-50 text-red-600 dark:border-red-700 dark:bg-red-900 dark:text-red-300';
const blue =
  'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300';
const yellow =
  'border-yellow-200 bg-yellow-50 text-yellow-600 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
const green =
  'border-green-200 bg-green-50 text-green-600 dark:border-green-700 dark:bg-green-900 dark:text-green-300';
const pink =
  'border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-700 dark:bg-pink-900 dark:text-pink-300';
const purple =
  'border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-700 dark:bg-purple-900 dark:text-purple-300';
const indigo =
  'border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-700 dark:bg-indigo-900 dark:text-indigo-300';
const teal =
  'border-teal-200 bg-teal-50 text-teal-600 dark:border-teal-700 dark:bg-teal-900 dark:text-teal-300';
const orange =
  'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-700 dark:bg-orange-900 dark:text-orange-300';
const lime =
  'border-lime-200 bg-lime-50 text-lime-600 dark:border-lime-700 dark:bg-lime-900 dark:text-lime-300';
const cyan =
  'border-cyan-200 bg-cyan-50 text-cyan-600 dark:border-cyan-700 dark:bg-cyan-900 dark:text-cyan-300';
const amber =
  'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-300';
const fuchsia =
  'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-600 dark:border-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300';
const rose =
  'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-700 dark:bg-rose-900 dark:text-rose-300';
const violet =
  'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-700 dark:bg-violet-900 dark:text-violet-300';
const emerald =
  'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
const sky =
  'border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-700 dark:bg-sky-900 dark:text-sky-300';

const colorVariants: Record<string, string> = {
  A: red,
  B: blue,
  C: yellow,
  D: green,
  E: pink,
  F: purple,
  G: indigo,
  H: teal,
  I: orange,
  J: lime,
  K: cyan,
  L: amber,
  M: fuchsia,
  N: rose,
  O: violet,
  P: emerald,
  Q: sky,
  R: blue,
  S: green,
  T: red,
  U: yellow,
  V: purple,
  W: pink,
  X: indigo,
  Y: teal,
  Z: orange,
};

const defaultColor =
  'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300';

interface Props {
  className?: string;
  username: string;
}

export default function Avatar({ className = '', username }: Props) {
  const letter = username.substring(0, 1).toUpperCase();
  const color = colorVariants[letter] || defaultColor;

  return (
    <div
      className={`${className} mx-0 flex shrink-0 items-center justify-center rounded-xl border lg:mx-auto xl:mx-0 ${color}`}
    >
      {letter}
    </div>
  );
}
