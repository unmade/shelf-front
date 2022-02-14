/* eslint-disable no-bitwise */
// based on https://www.somacon.com/p576.php

const KILOBYTE = 1000;
const MEGABYTE = 1000 * KILOBYTE;
const GIGABYTE = 1000 * MEGABYTE;
const TERABYTE = 1000 * GIGABYTE;
const PETABYTE = 1000 * TERABYTE;
const EXABYTE = 1000 * PETABYTE;

export default function getHumanSize(size) {
  let suffix;
  let readable;

  if (size >= EXABYTE) {
    suffix = 'EB';
    readable = size / EXABYTE;
  } else if (size >= PETABYTE) {
    suffix = 'PB';
    readable = size / PETABYTE;
  } else if (size >= TERABYTE) {
    suffix = 'TB';
    readable = size / TERABYTE;
  } else if (size >= GIGABYTE) {
    suffix = 'GB';
    readable = size / GIGABYTE;
  } else if (size >= MEGABYTE) {
    suffix = 'MB';
    readable = size / MEGABYTE;
  } else if (size >= KILOBYTE) {
    suffix = 'KB';
    readable = size / KILOBYTE;
  } else {
    return `${size} B`;
  }

  // Return formatted number with suffix
  return `${readable.toFixed(2)} ${suffix}`;
}
