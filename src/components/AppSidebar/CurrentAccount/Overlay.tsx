import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as icons from 'icons';
import * as routes from 'routes';
import { useAppDispatch } from 'hooks';

import { signedOut } from 'store/authSlice';

import Divider from 'components/ui/Divider';
import Button from 'components/ui/Button';

import PreferredAppearance from './PreferredAppearance';

export default function Overlay() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSignOut = () => {
    navigate(routes.SIGNIN.route);
    dispatch(signedOut());
  };

  return (
    <div className="flex min-w-48 flex-col space-y-2 rounded-xl p-2">
      <PreferredAppearance />
      <Divider />
      <div className="space-y-1">
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
      </div>
    </div>
  );
}
