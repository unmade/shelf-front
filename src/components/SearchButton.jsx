import React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from '../icons';

import Button from './ui/Button';

function SearchButton() {
  const { t } = useTranslation();

  return (
    <Button className="hidden lg:block" variant="text" full>
      <div className="group flex w-full items-center space-x-3 rounded-xl leading-6 font-medium text-gray-500 ring-offset-4 transition-colors duration-200 hover:text-gray-600 focus:ring focus:outline-none sm:space-x-4 dark:text-zinc-400 dark:hover:text-zinc-300">
        <icons.SearchOutlined className="h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-gray-500 dark:text-zinc-500 dark:group-hover:text-zinc-400" />
        <span className="text-lg">{t('Quick search')}</span>
        <span className="hidden rounded-md border border-gray-300 px-1.5 py-0.5 text-sm leading-5 text-gray-400 sm:block dark:border-zinc-600 dark:text-zinc-500">
          <kbd className="font-sans">
            <abbr title="Command" className="no-underline">
              ⌘
            </abbr>
          </kbd>
          <kbd className="font-sans">K</kbd>
        </span>
      </div>
    </Button>
  );
}

export default SearchButton;
