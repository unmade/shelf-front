import {
  FaCheckCircle,
  FaChevronRight,
  FaFolder,
  FaRegFile,
  FaRegFileImage,
} from 'react-icons/fa';

export const CheckCircle = FaCheckCircle;
export const ChevronRight = FaChevronRight;
export const File = FaRegFile;
export const Folder = FaFolder;
export const FileImage = FaRegFileImage;

const EXT_MAP = {
  '.jpg': FileImage,
  '.jpeg': FileImage,
  '.jpe': FileImage,
  '.png': FileImage,
};

export function getIconByExt(ext) {
  return EXT_MAP[ext] || File;
}
