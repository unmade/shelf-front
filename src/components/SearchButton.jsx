import React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from '../icons';

function SearchButton() {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="group hidden w-full items-center space-x-3 rounded-xl font-medium leading-6 text-gray-500 ring-offset-4 transition-colors duration-200 hover:text-gray-600 focus:outline-none focus:ring sm:space-x-4 lg:flex"
    >
      <icons.SearchOutlined className="h-5 w-5 text-gray-400 transition-colors duration-200 group-hover:text-gray-500" />
      <span className="text-lg">{t('Quick search')}</span>
      <span className="hidden rounded-md border border-gray-300 py-0.5 px-1.5 text-sm leading-5 text-gray-400 sm:block">
        <kbd className="font-sans">
          <abbr title="Command" className="no-underline">
            ⌘
          </abbr>
        </kbd>
        <kbd className="font-sans">K</kbd>
      </span>
    </button>
  );
}

export default SearchButton;
