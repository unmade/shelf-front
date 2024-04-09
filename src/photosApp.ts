import { IAppConfig } from 'types/AppConfig';

import i18n from './i18n';

import * as icons from './icons';
import * as routes from './routes';

const config: IAppConfig = {
  key: 'photos',
  title: i18n.t('photosApp.title'),
  path: routes.PHOTOS.prefix,
  menu: [
    {
      path: '/photos',
      title: i18n.t('Library', { defaultValue: 'Library' }),
      icon: icons.PhotographOutlined,
      desktopOnly: false,
      items: null,
      end: true,
    },
    {
      path: '/photos/albums',
      title: i18n.t('Albums', { defaultValue: 'Albums' }),
      icon: icons.Collection,
      desktopOnly: false,
      items: null,
      end: true,
    },
    {
      path: '/photos/favourites',
      title: i18n.t('Favourites', { defaultValue: 'Favourites' }),
      icon: icons.HeartOutlined,
      desktopOnly: false,
      items: null,
      end: false,
    },
    {
      path: '/photos/shared-links',
      title: i18n.t('Shared links', { defaultValue: 'Shared links' }),
      icon: icons.LinkOutlined,
      desktopOnly: false,
      items: null,
      end: false,
    },
    {
      path: '/photos/trash',
      title: i18n.t('Trash', { defaultValue: 'Trash' }),
      icon: icons.TrashOutlined,
      desktopOnly: false,
      items: null,
      end: false,
    },
  ],
};

i18n.on('languageChanged init', () => {
  config.title = i18n.t('photosApp.title', { defaultValue: 'Photos' });
  config.menu[0].title = i18n.t('Library');
  config.menu[1].title = i18n.t('Albums');
  config.menu[2].title = i18n.t('Favourites');
  config.menu[3].title = i18n.t('Shared links');
  config.menu[4].title = i18n.t('Trash');
});

export default config;
