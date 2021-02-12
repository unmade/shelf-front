import {
  BsLayersFill,
} from 'react-icons/bs';
import {
  HiCheckCircle,
  HiOutlineCloudUpload,
  HiFolder,
  HiFolderAdd,
  HiOutlineDotsHorizontal,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineX,
  HiXCircle,
  HiDocument,
  HiDocumentText,
  HiPhotograph,
  HiOutlineArrowRight,
  HiOutlinePencil,
  HiOutlineRefresh,
} from 'react-icons/hi';

export const AppLogo = BsLayersFill;
export const CheckCircle = HiCheckCircle;
export const CloudUpload = HiOutlineCloudUpload;
export const Close = HiOutlineX;
export const CrossCircle = HiXCircle;
export const Download = HiOutlineDownload;
export const Edit = HiOutlinePencil;
export const File = HiDocument;
export const FileCode = HiDocumentText;
export const FileImage = HiPhotograph;
export const FileText = HiDocumentText;
export const Folder = HiFolder;
export const Move = HiOutlineArrowRight;
export const ICursor = HiOutlinePencil;
export const More = HiOutlineDotsHorizontal;
export const Redo = HiOutlineRefresh;
export const TrashOutlined = HiOutlineTrash;
export const NewFolder = HiFolderAdd;

const EXT_MAP = {
  '.jpg': FileImage,
  '.jpeg': FileImage,
  '.jpe': FileImage,
  '.js': FileCode,
  '.json': FileCode,
  '.py': FileCode,
  '.md': FileText,
  '.png': FileImage,
};

export function getIconByExt(ext) {
  return EXT_MAP[ext.toLowerCase()] || File;
}
