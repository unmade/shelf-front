import {
  FaCheckCircle,
  FaChevronRight,
  FaFolder,
  FaFile,
  FaFileCode,
  FaFileImage,
  FaFileAlt,
  FaRegFolder,
  FaTimes,
} from 'react-icons/fa';
import {
  IoIosMore,
} from 'react-icons/io';
import {
  BsX,
  BsCloudUpload,
  BsCursorText,
  BsDownload,
  BsForward,
  BsTrash,
} from 'react-icons/bs';

export const CheckCircle = FaCheckCircle;
export const ChevronRight = FaChevronRight;
export const CloudUpload = BsCloudUpload;
export const Close = BsX;
export const Download = BsDownload;
export const File = FaFile;
export const FileCode = FaFileCode;
export const FileImage = FaFileImage;
export const FileText = FaFileAlt;
export const Folder = FaFolder;
export const FolderMove = BsForward;
export const FolderOutlined = FaRegFolder;
export const ICursor = BsCursorText;
export const More = IoIosMore;
export const Times = FaTimes;
export const TrashOutlined = BsTrash;

const EXT_MAP = {
  '.jpg': FileImage,
  '.jpeg': FileImage,
  '.jpe': FileImage,
  '.js': FileCode,
  '.json': FileCode,
  '.md': FileText,
  '.png': FileImage,
};

export function getIconByExt(ext) {
  return EXT_MAP[ext] || File;
}
