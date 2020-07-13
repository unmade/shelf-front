import {
  FaCheckCircle,
  FaChevronRight,
  FaFolder,
  FaRegFile,
  FaRegFolder,
  FaRegFileImage,
  FaTimes,
} from 'react-icons/fa';
import {
  IoIosMore,
} from 'react-icons/io';
import {
  BsX,
  BsCursorText,
  BsDownload,
  BsForward,
  BsTrash,
} from 'react-icons/bs';

export const CheckCircle = FaCheckCircle;
export const ChevronRight = FaChevronRight;
export const Close = BsX;
export const Download = BsDownload;
export const File = FaRegFile;
export const Folder = FaFolder;
export const FolderMove = BsForward;
export const FolderOutlined = FaRegFolder;
export const FileImage = FaRegFileImage;
export const ICursor = BsCursorText;
export const More = IoIosMore;
export const Times = FaTimes;
export const TrashOutlined = BsTrash;

const EXT_MAP = {
  '.jpg': FileImage,
  '.jpeg': FileImage,
  '.jpe': FileImage,
  '.png': FileImage,
};

export function getIconByExt(ext) {
  return EXT_MAP[ext] || File;
}
