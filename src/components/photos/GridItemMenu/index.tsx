import * as icons from 'icons';

import { Dropdown, DropdownButton } from 'components/ui/DropdownMenu';

import SimpleMenu, { type SimpleMenuProps } from 'components/SimpleMenu';

interface Props {
  sections: SimpleMenuProps['sections'];
  onOpen?: () => void;
}

const buttonStyles = [
  'rounded-full',
  'bg-gray-50 dark:bg-zinc-200 dark:hover:bg-zinc-100',
  'p-0.5',
  'text-gray-700 dark:text-zinc-600',
].join(' ');

export default function GridItemMenu({ sections, onOpen }: Props) {
  const onClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onOpen) {
      onOpen();
    }
  };
  return (
    <Dropdown>
      <DropdownButton as="button" className={buttonStyles} onClick={onClickHandler}>
        <icons.More className="h-3 w-3 shrink-0" />
      </DropdownButton>
      <SimpleMenu sections={sections} placement="bottom start" />
    </Dropdown>
  );
}
