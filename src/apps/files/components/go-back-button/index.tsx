import * as icons from 'icons';

import * as routes from 'routes';

import { Button } from '@/ui/button';

import { FileLink } from '@/apps/files/components/file-link';

interface Props {
  path: string;
}

export function GoBackButton({ path }: Props) {
  const parentPath = routes.parent(path);
  const disabled = routes.isRoot(path);

  const button = (
    <Button variant="ghost" size="icon" disabled={disabled}>
      <icons.ArrowLeft data-slot="icon" />
    </Button>
  );
  if (disabled) {
    return button;
  }
  return <FileLink path={parentPath}>{button}</FileLink>;
}
