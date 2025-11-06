import * as icons from 'icons';

import Button from 'components/ui/Button';

import FileLink from 'components/FileLink';

interface Props {
  to: string;
  disabled?: boolean;
}

export default function GoBackButton({ to, disabled }: Props) {
  const button = (
    <Button color="gray" variant="plain" disabled={disabled}>
      <icons.ArrowLeft data-slot="icon" />
    </Button>
  );
  if (disabled) {
    return button;
  }
  return <FileLink path={to}>{button}</FileLink>;
}
