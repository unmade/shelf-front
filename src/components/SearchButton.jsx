import React from 'react';

import { useTranslation } from 'react-i18next';

import * as icons from '../icons';

function SearchButton() {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="hidden lg:flex group leading-6 font-medium items-center space-x-3 sm:space-x-4 text-gray-500 hover:text-gray-600 transition-colors duration-200 w-full focus:outline-none focus:ring ring-offset-4 rounded-xl"
    >
      <icons.SearchOutlined className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
      <span className="text-lg">
        {t('Quick search')}
      </span>
      <span className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md">
        <kbd className="font-sans">
          <abbr title="Command" className="no-underline">⌘</abbr>
        </kbd>
        <kbd className="font-sans">K</kbd>
      </span>
    </button>
  );
}

export default SearchButton;
