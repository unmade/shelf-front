import {
  FaCheckCircle,
  FaChevronRight,
  FaDownload,
  FaICursor,
  FaFolder,
  FaRegFile,
  FaRegFolder,
  FaRegFileImage,
  FaRegTrashAlt,
} from 'react-icons/fa';
import {
  IoIosMore,
} from 'react-icons/io';

export const CheckCircle = FaCheckCircle;
export const ChevronRight = FaChevronRight;
export const Download = FaDownload;
export const File = FaRegFile;
export const Folder = FaFolder;
export const FolderOutlined = FaRegFolder;
export const FileImage = FaRegFileImage;
export const ICursor = FaICursor;
export const More = IoIosMore;
export const TrashOutlined = FaRegTrashAlt;

const EXT_MAP = {
  '.jpg': FileImage,
  '.jpeg': FileImage,
  '.jpe': FileImage,
  '.png': FileImage,
};

export function getIconByExt(ext) {
  return EXT_MAP[ext] || File;
}
