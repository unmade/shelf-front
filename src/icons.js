/* eslint-disable prefer-destructuring */
import * as cg from 'react-icons/cg';
import * as di from 'react-icons/di';
import * as io from 'react-icons/io';
import * as si from 'react-icons/si';

import * as hiSolid from '@heroicons/react/solid';
import * as hiOutline from '@heroicons/react/outline';

import { MediaType } from './constants';

import AppLogoIcon from './AppLogo';
import FolderSolid from './FolderIcon';

export const AppLogo = AppLogoIcon;
export const ArrowLeft = hiSolid.ArrowLeftIcon;
export const ArrowNarrowLeft = hiSolid.ArrowNarrowLeftIcon;
export const ArrowNarrowLeftOutlined = hiOutline.ArrowNarrowLeftIcon;
export const ArrowNarrowRight = hiSolid.ArrowNarrowRightIcon;
export const ArrowNarrowRightOutlined = hiOutline.ArrowNarrowRightIcon;
export const Bookmark = hiSolid.BookmarkIcon;
export const BookmarkOutlined = hiOutline.BookmarkIcon;
export const BookmarkAltOutlined = hiOutline.BookmarkAltIcon;
export const Check = hiSolid.CheckIcon;
export const CheckCircle = hiSolid.CheckCircleIcon;
export const ChevronLeft = hiSolid.ChevronLeftIcon;
export const ChevronLeftOutlined = hiOutline.ChevronLeftIcon;
export const ChevronRight = hiSolid.ChevronRightIcon;
export const Clear = hiSolid.BanIcon;
export const ClipboardCopyOutlined = hiOutline.ClipboardCopyIcon;
export const CloudUpload = hiSolid.CloudUploadIcon;
export const CloudUploadOutlined = hiOutline.CloudUploadIcon;
export const Close = hiOutline.XIcon;
export const CloseCirle = hiOutline.XCircleIcon;
export const Collection = hiOutline.CollectionIcon;
export const Database = hiSolid.DatabaseIcon;
export const DocumentSearchOutlined = hiOutline.DocumentSearchIcon;
export const DotsHorizontal = hiOutline.DotsHorizontalIcon;
export const DotsVerticalOutlined = hiOutline.DotsVerticalIcon;
export const Download = hiOutline.DownloadIcon;
export const Edit = hiOutline.PencilIcon;
export const ExclamationCircle = hiSolid.ExclamationCircleIcon;
export const ExternalLink = hiOutline.ExternalLinkIcon;
export const EyeOutlined = hiOutline.EyeIcon;
export const File = hiOutline.DocumentIcon;
export const FileCode = hiOutline.CodeIcon;
export const FileImage = hiOutline.PhotographIcon;
export const FileText = hiOutline.DocumentTextIcon;
export const Filter = hiSolid.FilterIcon;
export const Folder = FolderSolid;
export const Home = hiSolid.HomeIcon;
export const HomeOutlined = hiOutline.HomeIcon;
export const ICursor = hiOutline.PencilIcon;
export const Infinite = io.IoIosInfinite;
export const InformationCircleOutlined = hiOutline.InformationCircleIcon;
export const LinkOutlined = hiOutline.LinkIcon;
export const Logout = hiSolid.LogoutIcon;
export const LogoutOutlined = hiOutline.LogoutIcon;
export const NewFolder = hiSolid.FolderAddIcon;
export const Menu = hiSolid.MenuIcon;
export const MoonOutlined = hiOutline.MoonIcon;
export const More = hiSolid.DotsHorizontalIcon;
export const MoreOutlined = hiOutline.DotsHorizontalIcon;
export const Move = hiOutline.DocumentDuplicateIcon;
export const Plus = hiSolid.PlusIcon;
export const Redo = hiOutline.RefreshIcon;
export const SearchOutlined = hiOutline.SearchIcon;
export const Selector = hiSolid.SelectorIcon;
export const SelectorOutlined = hiOutline.SelectorIcon;
export const Spinner = cg.CgSpinner;
export const Trash = hiSolid.TrashIcon;
export const TrashOutlined = hiOutline.TrashIcon;
export const Upload = hiSolid.UploadIcon;
export const UsersOutline = hiOutline.UsersIcon;
export const UserRemoveOutlined = hiOutline.UserRemoveIcon;

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

export function getIcon(mediaType) {
  if (mediaType === null || mediaType === undefined) {
    return File;
  }
  if (PRECISE_MAP[mediaType]) {
    return PRECISE_MAP[mediaType];
  }
  const type = mediaType.split('/')[0];
  if (FUZZY_MAP[type]) {
    return FUZZY_MAP[type];
  }
  return File;
}
