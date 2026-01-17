import { memo } from 'react';

import {
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  FolderInputIcon,
  Link2Icon,
  PencilIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { useFileActions } from './hooks/useFileActions';

interface FileData {
  id: string;
  name: string;
  path: string;
}

interface FileBrowserRowActionsProps {
  file: FileData;
  isFolder: boolean;
}

/**
 * Actions dropdown menu for a file browser row.
 * Displays available actions for a file or folder.
 */
export const FileBrowserRowActions = memo(function FileBrowserRowActions({
  file,
  isFolder,
}: FileBrowserRowActionsProps) {
  const actions = useFileActions(file);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          aria-label={`Actions for ${file.name}`}
        >
          <EllipsisIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {!isFolder && (
          <DropdownMenuItem onSelect={actions.download}>
            <DownloadIcon className="size-4" />
            Download
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={actions.rename}>
          <PencilIcon className="size-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={actions.move}>
          <FolderInputIcon className="size-4" />
          Move to...
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={actions.copy}>
          <CopyIcon className="size-4" />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={actions.copyLink}>
          <Link2Icon className="size-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={actions.addToFavorites}>
          <StarIcon className="size-4" />
          Add to favorites
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={actions.delete}>
          <Trash2Icon className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

FileBrowserRowActions.displayName = 'FileBrowserRowActions';
