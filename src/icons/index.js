import * as cg from 'react-icons/cg';
import * as di from 'react-icons/di';
import * as io from 'react-icons/io';
import * as si from 'react-icons/si';

import * as hiSolid from '@heroicons/react/solid';
import * as hiOutline from '@heroicons/react/outline';

import { MediaType } from '../constants';

import AppLogoIcon from './AppLogo';
import FolderSolid from './FolderIcon';
import HeartOutlinedIcon from './HeartOutlinedIcon';
import HeartSolidIcon from './HeartSolidIcon';
import SharedFolderSolid from './SharedFolderIcon';
import UsersOutlinedIcon from './UsersOutlinedIcon';

export { ChevronUpIcon as ChevronUpSolid } from '@heroicons/react/solid';
export { MenuAlt4Icon as MenuAlt4Solid } from '@heroicons/react/solid';

export { FilesAppIcon } from './FilesAppIcon';
export { PhotosAppIcon } from './PhotosAppIcon';

export const AppLogo = AppLogoIcon;
export const ArrowLeft = hiSolid.ArrowLeftIcon;
export const BookmarkOutlined = hiOutline.BookmarkIcon;
export const Check = hiSolid.CheckIcon;
export const CheckCircle = hiSolid.CheckCircleIcon;
export const ChevronDown = hiSolid.ChevronDownIcon;
export const ChevronLeftOutlined = hiOutline.ChevronLeftIcon;
export const ChevronRightOutlined = hiOutline.ChevronRightIcon;
export const ClipboardCopyOutlined = hiOutline.ClipboardCopyIcon;
export const CloudUpload = hiSolid.CloudUploadIcon;
export const CloudUploadOutlined = hiOutline.CloudUploadIcon;
export const Close = hiOutline.XIcon;
export const Collection = hiOutline.CollectionIcon;
export const Database = hiSolid.DatabaseIcon;
export const Download = hiOutline.DownloadIcon;
export const Duplicate = hiOutline.DuplicateIcon;
export const Edit = hiOutline.PencilIcon;
export const ExclamationCircle = hiSolid.ExclamationCircleIcon;
const FileIcon = hiOutline.DocumentIcon;
const FileCode = hiOutline.CodeIcon;
const FileImage = hiOutline.PhotographIcon;
const FileText = hiOutline.DocumentTextIcon;
export const Folder = FolderSolid;
export const FolderAddOutlined = hiOutline.FolderAddIcon;
export const FolderRemoveOutlined = hiOutline.FolderRemoveIcon;
export const Heart = HeartSolidIcon;
export const HeartOutlined = HeartOutlinedIcon;
export const Home = hiSolid.HomeIcon;
export const HomeOutlined = hiOutline.HomeIcon;
export const ICursor = hiOutline.PencilIcon;
export const Infinite = io.IoIosInfinite;
export const InformationCircleOutlined = hiOutline.InformationCircleIcon;
export const LinkOutlined = hiOutline.LinkIcon;
export const LogoutOutlined = hiOutline.LogoutIcon;
export const More = hiSolid.DotsHorizontalIcon;
export const MoreOutlined = hiOutline.DotsHorizontalIcon;
export const Move = hiOutline.DocumentDuplicateIcon;
export const PhotographOutlined = hiOutline.PhotographIcon;
export const Plus = hiSolid.PlusIcon;
export const ReplyOutlined = hiOutline.ReplyIcon;
export const ShareOutlined = hiOutline.ShareIcon;
export const Spinner = cg.CgSpinner;
export const Trash = hiSolid.TrashIcon;
export const TrashOutlined = hiOutline.TrashIcon;
export const Upload = hiSolid.UploadIcon;
export const UsersOutlined = UsersOutlinedIcon;

const PRECISE_MAP = {
  [MediaType.FOLDER]: Folder,
  'application/epub+zip': hiOutline.DocumentTextIcon,
  'application/gzip': hiOutline.ArchiveIcon,
  'application/javascript': di.DiJavascript1,
  'application/json': si.SiJson,
  'application/pdf': si.SiAdobeacrobatreader,
  'application/sql': hiOutline.DatabaseIcon,
  'application/x-tar': hiOutline.ArchiveIcon,
  'application/x-sh': hiOutline.TerminalIcon,
  'application/x-zsh': hiOutline.TerminalIcon,
  'image/svg+xml': si.SiSvg, // this icon is slightly large than others
  'image/vnd.adobe.photoshop': di.DiPhotoshop,
  'text/css': di.DiCss3,
  'text/csv': hiOutline.TableIcon,
  'text/html': di.DiHtml5,
  'text/markdown': di.DiMarkdown,
  'text/jsx': di.DiReact,
  'text/tab-separated-values': hiOutline.TableIcon,
  'text/x-c': FileCode,
  'text/x-coffeescript': di.DiCoffeescript,
  'text/x-go': di.DiGo,
  'text/x-python': di.DiPython,
  'text/x-rust': di.DiRust,
  'text/x-swift': di.DiSwift,
  'text/x-vim': di.DiVim,
};

const FUZZY_MAP = {
  audio: hiSolid.MusicNoteIcon,
  image: FileImage,
  text: FileText,
  video: hiSolid.FilmIcon,
};

export function getIcon(mediaType, shared) {
  if (mediaType === null || mediaType === undefined) {
    return FileIcon;
  }
  if (mediaType === MediaType.FOLDER && shared) {
    return SharedFolderSolid;
  }
  if (PRECISE_MAP[mediaType]) {
    return PRECISE_MAP[mediaType];
  }
  const type = mediaType.split('/')[0];
  if (FUZZY_MAP[type]) {
    return FUZZY_MAP[type];
  }
  return FileIcon;
}
