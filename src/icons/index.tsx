import { forwardRef, createElement } from 'react';

import type { BoxIconProps } from '@boxicons/react';

import {
  Adobe as BiAdobe,
  AlbumCovers as BiAlbumCovers,
  AlertCircle as BiAlertCircle,
  AlertOctagon as BiAlertOctagon,
  AlertTriangle as BiAlertTriangle,
  Archive as BiArchive,
  ArrowFromBottom as BiArrowFromBottom,
  ArrowLeftStroke as BiArrowLeftStroke,
  ArrowRightStroke as BiArrowRightStroke,
  ArrowToBottomStroke as BiArrowToBottomStroke,
  BookAdd as BiBookAdd,
  Bookmark as BiBookmark,
  BookmarkPlus as BiBookmarkPlus,
  BookmarkX as BiBookmarkX,
  BookBookmark as BiBookBookmark,
  C as BiC,
  Check as BiCheck,
  CheckCircle as BiCheckCircle,
  ChevronDown as BiChevronDown,
  ChevronLeft as BiChevronLeft,
  ChevronRight as BiChevronRight,
  ChevronUp as BiChevronUp,
  Circle as BiCircle,
  CloudAlt as BiCloudAlt,
  Code as BiCode,
  Coffee as BiCoffee,
  Copy as BiCopy,
  Community as BiCommunity,
  Css3 as BiCss3,
  DatabaseAlt as BiDatabaseAlt,
  DotsHorizontalRounded as BiDotsHorizontalRounded,
  DotsVerticalRounded as BiDotsVerticalRounded,
  DoorOpen as BiDoorOpen,
  EditAlt as BiEditAlt,
  File as BiFile,
  FileDetail as BiFileDetail,
  Film as BiFilm,
  FolderUpArrow as BiFolderUpArrow,
  FolderMinus as BiFolderMinus,
  FolderPlus as BiFolderPlus,
  GoLang as BiGoLang,
  Grid as BiGrid,
  HeartPlus as BiHeartPlus,
  HeartBreak as BiHeartBreak,
  HomeAlt as BiHomeAlt,
  HomeAlt2 as BiHomeAlt2,
  Html5 as BiHtml5,
  Image as BiImage,
  InfoCircle as BiInfoCircle,
  Infinite as BiInfinite,
  Javascript as BiJavascript,
  Layers as BiLayers,
  Link as BiLink,
  ListUl as BiListUl,
  LoaderLines as BiLoaderLines,
  Markdown as BiMarkdown,
  Menu as BiMenu,
  Minus as BiMinus,
  Music as BiMusic,
  Plus as BiPlus,
  Python as BiPython,
  ReactIcon as BiReactIcon,
  Reply as BiReply,
  Share as BiShare,
  SidebarRight as BiSidebarRight,
  Table as BiTable,
  Terminal as BiTerminal,
  Trash as BiTrash,
  X as BiX,
} from '@boxicons/react';

import { MediaType } from '../constants';

import AppLogoComponent from './AppLogo';
import FolderSolid from './FolderIcon';
import HeartOutlinedComponent from './HeartOutlinedIcon';
import HeartSolidComponent from './HeartSolidIcon';
import SharedFolderSolid from './SharedFolderIcon';

type BoxIcon = React.ForwardRefExoticComponent<BoxIconProps & React.RefAttributes<SVGSVGElement>>;

/** Creates an icon component with a preset pack (variant). */
function withPack(Icon: BoxIcon, pack: BoxIconProps['pack']): BoxIcon {
  const Wrapped = forwardRef<SVGSVGElement, BoxIconProps>((props, ref) =>
    createElement(Icon, { ref, pack, ...props }),
  );
  Wrapped.displayName = Icon.displayName;
  return Wrapped;
}

// ---------------------------------------------------------------------------
// Custom icons
// ---------------------------------------------------------------------------
export { FilesAppIcon } from './FilesAppIcon';
export { PhotosAppIcon } from './PhotosAppIcon';

export const AppLogoIcon = AppLogoComponent;
export const FolderIcon = FolderSolid;
export const HeartIcon = HeartSolidComponent;
export const HeartOutlineIcon = HeartOutlinedComponent;

// ---------------------------------------------------------------------------
// Solid icons
// ---------------------------------------------------------------------------
export const AlbumsIcon = withPack(BiAlbumCovers, 'filled');
export const AddToAlbumIcon = withPack(BiBookAdd, 'filled');
export const ArrowLeftStrokeIcon = withPack(BiArrowLeftStroke, 'filled');
export const ArrowRightStrokeIcon = withPack(BiArrowRightStroke, 'filled');
export const BookmarkIcon = withPack(BiBookmark, 'filled');
export const BookmarkAddIcon = withPack(BiBookmarkPlus, 'filled');
export const BookmarkRemoveIcon = withPack(BiBookmarkX, 'filled');
export const BookmarksIcon = withPack(BiBookBookmark, 'filled');
export const CheckIcon = withPack(BiCheck, 'filled');
export const CheckCircleIcon = withPack(BiCheckCircle, 'filled');
export const ChevronDownIcon = withPack(BiChevronDown, 'filled');
export const ChevronLeftIcon = withPack(BiChevronLeft, 'filled');
export const ChevronRightIcon = withPack(BiChevronRight, 'filled');
export const ChevronUpIcon = withPack(BiChevronUp, 'filled');
export const CircleIcon = withPack(BiCircle, 'filled');
export const CloseIcon = withPack(BiX, 'filled');
export const CloudUploadIcon = withPack(BiCloudAlt, 'filled');
export const CopyIcon = withPack(BiCopy, 'filled');
export const DatabaseIcon = withPack(BiDatabaseAlt, 'filled');
export const DownloadIcon = withPack(BiArrowToBottomStroke, 'filled');
export const DuplicateIcon = withPack(BiCopy, 'basic');
export const ExclamationCircleIcon = withPack(BiAlertCircle, 'filled');
export const FavoriteAddIcon = withPack(BiHeartPlus, 'filled');
export const FavoriteRemoveIcon = withPack(BiHeartBreak, 'filled');
export const FolderMinusIcon = withPack(BiFolderMinus, 'filled');
export const FolderPlusIcon = withPack(BiFolderPlus, 'filled');
export const GridIcon = withPack(BiGrid, 'filled');
export const HomeIcon = withPack(BiHomeAlt, 'filled');
export const HomeAltIcon = withPack(BiHomeAlt2, 'filled');
export const ImageIcon = withPack(BiImage, 'filled');
export const InfoCircleIcon = withPack(BiInfoCircle, 'filled');
export const LayersIcon = withPack(BiLayers, 'filled');
export const LinkIcon = withPack(BiLink, 'filled');
export const ListIcon = withPack(BiListUl, 'filled');
export const LogoutIcon = withPack(BiDoorOpen, 'filled');
export const MenuIcon = withPack(BiMenu, 'filled');
export const MinusIcon = withPack(BiMinus, 'filled');
export const MoreHorizontalIcon = withPack(BiDotsHorizontalRounded, 'filled');
export const MoreVerticalIcon = withPack(BiDotsVerticalRounded, 'filled');
export const MoveIcon = withPack(BiFolderUpArrow, 'filled');
export const PlusIcon = withPack(BiPlus, 'filled');
export const RemoveFromAlbumIcon = withPack(BiX, 'filled');
export const RenameIcon = withPack(BiEditAlt, 'filled');
export const ShareIcon = withPack(BiShare, 'filled');
export const SidebarRightIcon = withPack(BiSidebarRight, 'filled');
export const TrashIcon = withPack(BiTrash, 'filled');
export const UndoIcon = withPack(BiReply, 'filled');
export const UploadIcon = withPack(BiArrowFromBottom, 'filled');
export const UsersIcon = withPack(BiCommunity, 'filled');

// ---------------------------------------------------------------------------
// Outline variants
// ---------------------------------------------------------------------------
export const CloudUploadOutlineIcon = BiCloudAlt;
export const MoreHorizontalOutlineIcon = BiDotsHorizontalRounded;

// ---------------------------------------------------------------------------
// Special / utility icons
// ---------------------------------------------------------------------------
export const InfiniteIcon = BiInfinite;
export const SpinnerIcon = BiLoaderLines;

// Toast / notification icons
export const AlertTriangleIcon = withPack(BiAlertTriangle, 'filled');
export const AlertOctagonIcon = withPack(BiAlertOctagon, 'filled');
export const LoaderIcon = BiLoaderLines;

// ---------------------------------------------------------------------------
// File-type icons
// ---------------------------------------------------------------------------
const FileIconDefault = withPack(BiFile, 'filled');
const FileImageInternal = withPack(BiImage, 'filled');
const FileTextInternal = withPack(BiFileDetail, 'filled');

const ArchiveIcon = withPack(BiArchive, 'filled');
const TerminalIcon = withPack(BiTerminal, 'filled');
const TableIcon = withPack(BiTable, 'filled');
const CodeOutline = BiCode;
const DatabaseOutline = BiDatabaseAlt;
const TerminalOutline = BiTerminal;
const CoffeeIcon = withPack(BiCoffee, 'filled');

const PRECISE_MAP = {
  [MediaType.FOLDER]: FolderIcon,
  'application/epub+zip': FileTextInternal,
  'application/gzip': ArchiveIcon,
  'application/javascript': BiJavascript,
  'application/json': CodeOutline,
  'application/pdf': BiAdobe,
  'application/sql': DatabaseOutline,
  'application/x-tar': ArchiveIcon,
  'application/x-sh': TerminalIcon,
  'application/x-zsh': TerminalIcon,
  'image/svg+xml': CodeOutline,
  'image/vnd.adobe.photoshop': BiAdobe,
  'text/css': BiCss3,
  'text/csv': TableIcon,
  'text/html': BiHtml5,
  'text/markdown': BiMarkdown,
  'text/jsx': BiReactIcon,
  'text/tab-separated-values': TableIcon,
  'text/x-c': BiC,
  'text/x-coffeescript': CoffeeIcon,
  'text/x-go': BiGoLang,
  'text/x-python': BiPython,
  'text/x-rust': CodeOutline,
  'text/x-swift': CodeOutline,
  'text/x-vim': TerminalOutline,
};

const FUZZY_MAP = {
  audio: withPack(BiMusic, 'filled'),
  image: FileImageInternal,
  text: FileTextInternal,
  video: withPack(BiFilm, 'filled'),
};

export function getIcon(mediaType: string | null | undefined, shared?: boolean) {
  if (mediaType == null) {
    return FileIconDefault;
  }
  if (mediaType === MediaType.FOLDER && shared) {
    return SharedFolderSolid;
  }
  if (mediaType in PRECISE_MAP) {
    return PRECISE_MAP[mediaType as keyof typeof PRECISE_MAP];
  }
  const type = mediaType.split('/')[0] as keyof typeof FUZZY_MAP;
  if (FUZZY_MAP[type]) {
    return FUZZY_MAP[type];
  }
  return FileIconDefault;
}
