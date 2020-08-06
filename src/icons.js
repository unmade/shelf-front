import {
  FaCheckCircle,
  FaChevronRight,
  FaFolder,
  FaFile,
  FaFileCode,
  FaFileImage,
  FaFileAlt,
  FaRedo,
  FaRegFolder,
  FaTimesCircle,
  FaFolderPlus,
} from 'react-icons/fa';
import {
  IoIosMore,
} from 'react-icons/io';
import {
  BsCloudUpload,
  BsCursorText,
  BsDownload,
  BsForward,
  BsPencil,
  BsTrash,
  BsX,
} from 'react-icons/bs';

export const CheckCircle = FaCheckCircle;
export const ChevronRight = FaChevronRight;
export const CloudUpload = BsCloudUpload;
export const Close = BsX;
export const CrossCircle = FaTimesCircle;
export const Download = BsDownload;
export const Edit = BsPencil;
export const File = FaFile;
export const FileCode = FaFileCode;
export const FileImage = FaFileImage;
export const FileText = FaFileAlt;
export const Folder = FaFolder;
export const FolderMove = BsForward;
export const FolderOutlined = FaRegFolder;
export const ICursor = BsCursorText;
export const More = IoIosMore;
export const Redo = FaRedo;
export const TrashOutlined = BsTrash;
export const NewFolder = FaFolderPlus;

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
