import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '@/hooks';
import * as routes from '@/routes';
import { signedOut } from '@/store/authSlice';

import * as icons from '@/icons';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/ui/dropdown-menu';

import { useAppearanceContext, Appearance } from '@/components/AppearanceProvider';

function PreferredAppearanceRadioGroup() {
  const { t } = useTranslation();

  const { appearance, setAppearance } = useAppearanceContext();

  return (
    <DropdownMenuRadioGroup
      value={appearance}
      onValueChange={(value) => setAppearance(value as Appearance)}
    >
      <DropdownMenuRadioItem value={Appearance.Light}>{t('Light')}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={Appearance.Dark}>{t('Dark')}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={Appearance.Auto}>{t('Auto')}</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}

function SignOutMenuItem() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignOut = () => {
    navigate(routes.SIGNIN.route);
    dispatch(signedOut());
  };

  return (
    <DropdownMenuItem variant="destructive" onSelect={onSignOut}>
      <icons.LogoutOutlined data-slot="icon" />
      {t('Sign Out')}
    </DropdownMenuItem>
  );
}

export default function CurrentAccountDropdownContent() {
  const { t } = useTranslation();

  return (
    <DropdownMenuContent className="min-w-56" side="bottom" align="end">
      <DropdownMenuLabel>{t('Appearance')}</DropdownMenuLabel>
      <PreferredAppearanceRadioGroup />
      <DropdownMenuSeparator />
      <SignOutMenuItem />
    </DropdownMenuContent>
  );
}
