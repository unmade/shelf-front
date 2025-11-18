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

import { usePrefersColorSchemeContext, ColorScheme } from 'components/PrefersColorSchemeProvider';

function PreferredAppearanceRadioGroup() {
  const { t } = useTranslation();

  const { scheme, setScheme } = usePrefersColorSchemeContext();

  return (
    <DropdownMenuRadioGroup
      value={scheme}
      onValueChange={(value) => setScheme(value as ColorScheme)}
    >
      <DropdownMenuRadioItem value={ColorScheme.Light}>{t('Light')}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={ColorScheme.Dark}>{t('Dark')}</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value={ColorScheme.Auto}>{t('Auto')}</DropdownMenuRadioItem>
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
