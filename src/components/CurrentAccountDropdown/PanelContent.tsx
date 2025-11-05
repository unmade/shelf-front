import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as icons from 'icons';
import * as routes from 'routes';
import { useAppDispatch } from 'hooks';

import { signedOut } from 'store/authSlice';

import Divider from 'components/ui/Divider';
import Button from 'components/ui/Button';

import PreferredAppearance from './PreferredAppearance';

function useSignOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    navigate(routes.SIGNIN.route);
    dispatch(signedOut());
  };
}

export default function Panel() {
  const { t } = useTranslation();

  const onSignOut = useSignOut();

  return (
    <>
      <PreferredAppearance />
      <Divider className="mt-4 mb-2" />
      <Button
        className="w-full"
        variant="plain"
        color="red"
        title={t('Sign Out')}
        onClick={onSignOut}
      >
        <icons.LogoutOutlined data-slot="icon" />
        {t('Sign Out')}
      </Button>
    </>
  );
}
