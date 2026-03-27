import { MoreHorizontalIcon } from '@/icons';

import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';

import SimpleMenuContent, { type SimpleMenuContentProps } from '@/components/SimpleMenuContent';

interface Props {
  groups: SimpleMenuContentProps['groups'];
  onOpen?: () => void;
}

const buttonStyles = [
  'rounded-full focus:outline-none',
  'bg-gray-50 dark:bg-zinc-200 dark:hover:bg-zinc-100',
  'p-0.5',
  'text-gray-700 dark:text-zinc-600',
].join(' ');

export default function GridItemMenu({ groups, onOpen }: Props) {
  const handleOpen = (open: boolean) => {
    if (open) {
      onOpen?.();
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <button className={buttonStyles}>
          <MoreHorizontalIcon className="size-3" />
        </button>
      </DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} side="bottom" align="start" />
    </DropdownMenu>
  );
}
