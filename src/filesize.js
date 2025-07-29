// based on https://www.somacon.com/p576.php

export const KILOBYTE = 1000;
export const MEGABYTE = 1000 * KILOBYTE;
export const GIGABYTE = 1000 * MEGABYTE;
export const TERABYTE = 1000 * GIGABYTE;
export const PETABYTE = 1000 * TERABYTE;
export const EXABYTE = 1000 * PETABYTE;

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
    suffix = 'B';
    readable = size;
  }

  // Return formatted number with suffix
  return `${readable.toFixed(2)} ${suffix}`;
}
