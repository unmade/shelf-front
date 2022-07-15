import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import i18n from '../../../i18n';

import { fileDialogOpened } from '../../../store/actions/ui';

import { Dialogs } from '../../../constants';
import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../Button';
import Menu from '../Menu';

import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbItemCollapsed from './BreadcrumbItemCollapsed';

const BREADCRUMBS_ALIASES = {
  files: {
    Icon: icons.Home,
    name: i18n.t('Home'),
    url: routes.FILES.prefix,
  },
  trash: {
    Icon: icons.Trash,
    name: i18n.t('Trash'),
    url: routes.TRASH.prefix,
  },
};

i18n.on('languageChanged init', () => {
  BREADCRUMBS_ALIASES.files.name = i18n.t('Home');
  BREADCRUMBS_ALIASES.trash.name = i18n.t('Trash');
});

export function breadcrumbs(path) {
  const parts = routes.makeUrlFromPath({ path }).split('/').slice(1);
  const items = [BREADCRUMBS_ALIASES[parts[0]]];
  let prefix = items[0].url;
  parts.slice(1).forEach((part) => {
    prefix = `${prefix}/${part}`;
    items.push({
      Icon: icons.Folder,
      name: decodeURIComponent(part),
      url: prefix,
    });
  });

  return items;
}

function Breadcrumb({
  className,
  path,
  withCreateFolder,
  itemRender: Render,
  itemRenderCollapsed: RenderCollapsed,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = breadcrumbs(path);
  const onCreateFolder = () => dispatch(fileDialogOpened(Dialogs.createFolder));
  if (items.length < 4) {
    return (
      <nav
        className={`${className} flex items-center space-x-1 whitespace-nowrap font-medium text-gray-500 sm:space-x-4`}
      >
        {items.map((item, idx) => (
          <React.Fragment key={item.url}>
            {idx !== 0 && <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />}
            <span className="flex max-w-xs items-center truncate">
              {idx === 0 && (
                <span className="py-2 sm:py-1">
                  <item.Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300" />
                </span>
              )}
              <Render name={item.name} url={item.url} />
            </span>
          </React.Fragment>
        ))}
        {withCreateFolder && (
          <>
            <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
            <button
              type="button"
              title={t('button_create_folder_title')}
              className="rounded-lg p-2 text-gray-400 ring-teal-200 ring-offset-2 hover:bg-teal-50 hover:text-blue-400 focus:outline-none focus:ring-2 sm:p-1"
              onClick={onCreateFolder}
            >
              <icons.NewFolder className="h-4 w-4" />
            </button>
          </>
        )}
      </nav>
    );
  }

  const [first, ...rest] = items;
  const last = rest.pop();

  return (
    <nav
      className={`${className} flex items-center space-x-1 whitespace-nowrap font-medium text-gray-500 sm:space-x-4`}
    >
      <span className="flex max-w-xs items-center">
        <first.Icon className="mr-2 h-4 w-4 shrink-0 text-gray-300" />
        <Render name={first.name} url={first.url} />
      </span>
      <div>
        <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
      </div>
      <Menu
        panelClassName="max-w-xs"
        items={rest}
        itemRender={({ item }) => <RenderCollapsed name={item.name} url={item.url} />}
      >
        <Button
          as="div"
          type="text"
          size="sm"
          icon={<icons.DotsHorizontal className="h-4 w-4" />}
        />
      </Menu>
      <div>
        <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
      </div>
      <span className="max-w-2xs">
        <Render name={last.name} url={last.url} />
      </span>
      {withCreateFolder && (
        <>
          <icons.ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
          <button
            type="button"
            className="rounded-lg p-2 text-gray-400 ring-teal-200 ring-offset-2 hover:bg-teal-50 hover:text-blue-400 focus:outline-none focus:ring-2 sm:p-1"
            onClick={onCreateFolder}
          >
            <icons.NewFolder className="h-4 w-4 shrink-0" />
          </button>
        </>
      )}
    </nav>
  );
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.ItemCollapsed = BreadcrumbItemCollapsed;

Breadcrumb.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.elementType.isRequired,
  itemRenderCollapsed: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: '',
};

export default Breadcrumb;
