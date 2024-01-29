import i18n from './i18n';

import * as icons from './icons';

const menu = [
  {
    path: '/photos',
    title: i18n.t('Library', { defaultValue: 'Library' }),
    icon: icons.PhotographOutlined,
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
];

i18n.on('languageChanged init', () => {
  menu[0].title = i18n.t('Library');
  menu[1].title = i18n.t('Favourites');
  menu[2].title = i18n.t('Shared links');
  menu[3].title = i18n.t('Trash');
});

export default menu;
