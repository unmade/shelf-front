import { forwardRef, createElement } from 'react';
import type { BoxIconProps } from '@boxicons/react';

import {
  Adobe,
  AlbumCovers as BiAlbumCovers,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Archive,
  ArrowFromBottom,
  ArrowLeft as BiArrowLeft,
  ArrowLeftStroke as BiArrowLeftStroke,
  ArrowRight as BiArrowRight,
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
  Code,
  Coffee,
  Copy as BiCopy,
  Community as BiCommunity,
  Css3,
  DatabaseAlt as BiDatabaseAlt,
  DotsHorizontalRounded,
  DotsVerticalRounded,
  DoorOpen,
  EditAlt as BiEditAlt,
  File,
  FileDetail,
  Film as BiFilm,
  FolderUpArrow as BiFolderUpArrow,
  FolderMinus as BiFolderMinus,
  FolderPlus as BiFolderPlus,
  GoLang,
  Grid as BiGrid,
  HeartPlus as BiHeartPlus,
  HeartBreak as BiHeartBreak,
  HomeAlt as BiHomeAlt,
  HomeAlt2 as BiHomeAlt2,
  Html5,
  Image as BiImage,
  InfoCircle as BiInfoCircle,
  Infinite as BiInfinite,
  Javascript,
  Layers,
  Link as BiLink,
  ListUl,
  LoaderLines,
  Markdown,
  Menu as BiMenu,
  Minus as BiMinus,
  Music,
  Plus as BiPlus,
  Python,
  ReactIcon,
  Reply as BiReply,
  Share as BiShare,
  SidebarRight,
  Table as BiTable,
  Terminal,
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
// Custom icons (kept as-is)
// ---------------------------------------------------------------------------
export { FilesAppIcon } from './FilesAppIcon';
export { PhotosAppIcon } from './PhotosAppIcon';

export const AppLogoIcon = AppLogoComponent;
export const FolderIcon = FolderSolid;
export const HeartIcon = HeartSolidComponent;
export const HeartOutlineIcon = HeartOutlinedComponent;

// ---------------------------------------------------------------------------
// Solid (filled) icons – preferred for buttons, dropdowns, sidebar
// ---------------------------------------------------------------------------
export const AlbumsIcon = withPack(BiAlbumCovers, 'filled');
export const AddToAlbumIcon = withPack(BiBookAdd, 'filled');
export const ArrowLeftIcon = withPack(BiArrowLeft, 'filled');
export const ArrowLeftStrokeIcon = withPack(BiArrowLeftStroke, 'filled');
export const ArrowRightIcon = withPack(BiArrowRight, 'filled');
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
export const ExclamationCircleIcon = withPack(AlertCircle, 'filled');
export const FavoriteAddIcon = withPack(BiHeartPlus, 'filled');
export const FavoriteRemoveIcon = withPack(BiHeartBreak, 'filled');
export const FolderMinusIcon = withPack(BiFolderMinus, 'filled');
export const FolderPlusIcon = withPack(BiFolderPlus, 'filled');
export const GridIcon = withPack(BiGrid, 'filled');
export const HomeIcon = withPack(BiHomeAlt, 'filled');
export const HomeAltIcon = withPack(BiHomeAlt2, 'filled');
export const ImageIcon = withPack(BiImage, 'filled');
export const InfoCircleIcon = withPack(BiInfoCircle, 'filled');
export const LayersIcon = withPack(Layers, 'filled');
export const LinkIcon = withPack(BiLink, 'filled');
export const ListIcon = withPack(ListUl, 'filled');
export const LogoutIcon = withPack(DoorOpen, 'filled');
export const MenuIcon = withPack(BiMenu, 'filled');
export const MinusIcon = withPack(BiMinus, 'filled');
export const MoreHorizontalIcon = withPack(DotsHorizontalRounded, 'filled');
export const MoreVerticalIcon = withPack(DotsVerticalRounded, 'filled');
export const MoveIcon = withPack(BiFolderUpArrow, 'filled');
export const PlusIcon = withPack(BiPlus, 'filled');
export const RemoveFromAlbumIcon = withPack(BiX, 'filled');
export const RenameIcon = withPack(BiEditAlt, 'filled');
export const ShareIcon = withPack(BiShare, 'filled');
export const SidebarRightIcon = withPack(SidebarRight, 'filled');
export const TrashIcon = withPack(BiTrash, 'filled');
export const UndoIcon = withPack(BiReply, 'filled');
export const UploadIcon = withPack(ArrowFromBottom, 'filled');
export const UsersIcon = withPack(BiCommunity, 'filled');

// ---------------------------------------------------------------------------
// Outline variants (when a lighter weight is specifically needed)
// ---------------------------------------------------------------------------
export const CloudUploadOutlineIcon = BiCloudAlt;
export const MoreHorizontalOutlineIcon = DotsHorizontalRounded;

// ---------------------------------------------------------------------------
// Special / utility icons
// ---------------------------------------------------------------------------
export const InfiniteIcon = BiInfinite;
export const SpinnerIcon = LoaderLines;

// Toast / notification icons
export const AlertTriangleIcon = withPack(AlertTriangle, 'filled');
export const AlertOctagonIcon = withPack(AlertOctagon, 'filled');
export const LoaderIcon = LoaderLines;

// ---------------------------------------------------------------------------
// Internal: file-type icons used by getIcon()
// ---------------------------------------------------------------------------
const FileIconDefault = withPack(File, 'filled');
const FileImageInternal = withPack(BiImage, 'filled');
const FileTextInternal = withPack(FileDetail, 'filled');

const ArchiveIcon = withPack(Archive, 'filled');
const TerminalIcon = withPack(Terminal, 'filled');
const TableIcon = withPack(BiTable, 'filled');
const CodeOutline = Code;
const DatabaseOutline = BiDatabaseAlt;
const TerminalOutline = Terminal;
const CoffeeIcon = withPack(Coffee, 'filled');

const PRECISE_MAP = {
  [MediaType.FOLDER]: FolderIcon,
  'application/epub+zip': FileTextInternal,
  'application/gzip': ArchiveIcon,
  'application/javascript': Javascript,
  'application/json': CodeOutline,
  'application/pdf': Adobe,
  'application/sql': DatabaseOutline,
  'application/x-tar': ArchiveIcon,
  'application/x-sh': TerminalIcon,
  'application/x-zsh': TerminalIcon,
  'image/svg+xml': CodeOutline,
  'image/vnd.adobe.photoshop': Adobe,
  'text/css': Css3,
  'text/csv': TableIcon,
  'text/html': Html5,
  'text/markdown': Markdown,
  'text/jsx': ReactIcon,
  'text/tab-separated-values': TableIcon,
  'text/x-c': BiC,
  'text/x-coffeescript': CoffeeIcon,
  'text/x-go': GoLang,
  'text/x-python': Python,
  'text/x-rust': CodeOutline,
  'text/x-swift': CodeOutline,
  'text/x-vim': TerminalOutline,
};

const FUZZY_MAP = {
  audio: withPack(Music, 'filled'),
  image: FileImageInternal,
  text: FileTextInternal,
  video: withPack(BiFilm, 'filled'),
};

export function getIcon(mediaType: string | null | undefined, shared?: boolean) {
  if (mediaType === null || mediaType === undefined) {
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
