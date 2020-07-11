/* eslint-disable no-bitwise */
// based on https://www.somacon.com/p576.php

const EXABYTE = 0x1000000000000000;
const PETABYTE = 0x4000000000000;
const TERABYTE = 0x10000000000;
const GIGABYTE = 0x40000000;
const MEGABYTE = 0x100000;
const KILOBYTE = 0x400;

export default function getHumanSize(size) {
  let suffix;
  let readable;

  if (size >= EXABYTE) {
    suffix = 'EB';
    readable = (size >> 50);
  } else if (size >= PETABYTE) {
    suffix = 'PB';
    readable = (size >> 40);
  } else if (size >= TERABYTE) {
    suffix = 'TB';
    readable = (size >> 30);
  } else if (size >= GIGABYTE) {
    suffix = 'GB';
    readable = (size >> 20);
  } else if (size >= MEGABYTE) {
    suffix = 'MB';
    readable = (size >> 10);
  } else if (size >= KILOBYTE) {
    suffix = 'KB';
    readable = size;
  } else {
    return `${size} B`;
  }
  // Divide by 1024 to get fractional value
  readable /= 1024;
  // Return formatted number with suffix
  return `${readable.toFixed(2)} ${suffix}`;
}
