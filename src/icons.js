import * as di from 'react-icons/di';
import * as hi from 'react-icons/hi';
import * as si from 'react-icons/si';
import { BsLayersFill } from 'react-icons/bs';

import { MediaType } from './constants';

export const AppLogo = BsLayersFill;
export const ArrowLeft = hi.HiArrowNarrowLeft;
export const ArrowRight = hi.HiArrowNarrowRight;
export const CheckCircle = hi.HiCheckCircle;
export const ChevronLeft = hi.HiOutlineChevronLeft;
export const CloudUpload = hi.HiOutlineCloudUpload;
export const Close = hi.HiOutlineX;
export const CrossCircle = hi.HiXCircle;
export const Download = hi.HiOutlineDownload;
export const Edit = hi.HiOutlinePencil;
export const File = hi.HiOutlineDocument;
export const FileCode = hi.HiOutlineCode;
export const FileImage = hi.HiOutlinePhotograph;
export const FileText = hi.HiOutlineDocumentText;
export const Folder = hi.HiFolder;
export const ICursor = hi.HiOutlinePencil;
export const NewFolder = hi.HiOutlineFolderAdd;
export const More = hi.HiOutlineDotsHorizontal;
export const Move = hi.HiOutlineArrowRight;
export const Redo = hi.HiOutlineRefresh;
export const TrashOutlined = hi.HiOutlineTrash;

const PRECISE_MAP = {
  [MediaType.FOLDER]: Folder,
  'application/gzip': hi.HiOutlineArchive,
  'application/javascript': di.DiJavascript1,
  'application/json': si.SiJson,
  'application/pdf': si.SiAdobeacrobatreader,
  'application/sql': hi.HiOutlineDatabase,
  'application/x-tar': hi.HiOutlineArchive,
  'application/x-sh': hi.HiOutlineTerminal,
  'application/x-zsh': hi.HiOutlineTerminal,
  'image/svg+xml': si.SiSvg, // this icon is slightly large than others
  'image/vnd.adobe.photoshop': di.DiPhotoshop,
  'text/css': di.DiCss3,
  'text/csv': hi.HiOutlineTable,
  'text/html': di.DiHtml5,
  'text/markdown': di.DiMarkdown,
  'text/jsx': di.DiReact,
  'text/tab-separated-values': hi.HiOutlineTable,
  'text/x-c': FileCode,
  'text/x-coffeescript': di.DiCoffeescript,
  'text/x-go': di.DiGo,
  'text/x-python': di.DiPython,
  'text/x-rust': di.DiRust,
  'text/x-swift': di.DiSwift,
  'text/x-vim': di.DiVim,
};

const FUZZY_MAP = {
  audio: hi.HiMusicNote,
  image: FileImage,
  text: FileText,
  video: hi.HiFilm,
};

export function getIcon(mediaType) {
  if (PRECISE_MAP[mediaType]) {
    return PRECISE_MAP[mediaType];
  }
  const type = mediaType.split('/')[0];
  if (FUZZY_MAP[type]) {
    return FUZZY_MAP[type];
  }
  return File;
}
