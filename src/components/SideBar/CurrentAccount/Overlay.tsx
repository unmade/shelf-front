import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as icons from 'icons';
import * as routes from 'routes';
import { useAppDispatch } from 'hooks';

import { signedOut } from 'store/authSlice';

import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';

import PreferredAppearance from './PreferredAppearance';

interface Props {
  fullName: string;
  email: string | null;
  username: string;
}

export default function Overlay({ fullName, email, username }: Props) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const displayName = fullName || email || username;

  const onSignOut = () => {
    navigate(routes.SIGNIN.route);
    dispatch(signedOut());
  };

  return (
    <div className="flex min-w-48 flex-col space-y-2 rounded-xl bg-white p-2 shadow focus:outline-none dark:bg-zinc-800 dark:shadow-zinc-900/70">
      <div className="flex flex-row items-center p-1">
        <Avatar className="h-10 w-10 rounded-lg" username={displayName} />
        <div className="ml-2 flex flex-1 flex-col text-left text-gray-700 dark:text-gray-300">
          <div className="text-sm font-semibold">{displayName}</div>
          {fullName && <div className="text-xs">{email ?? `@${username}`}</div>}
        </div>
      </div>
      <hr className="dark:border-zinc-700" />
      <PreferredAppearance />
      <div className="space-y-1">
        <Button
          full
          variant="text"
          color="danger"
          title={t('Sign Out')}
          icon={<icons.LogoutOutlined className="h-5 w-5" />}
          onClick={onSignOut}
        >
          <div className="my-1">{t('Sign Out')}</div>
        </Button>
      </div>
    </div>
  );
}
