import React from 'react';
import PropTypes from 'prop-types';

import { Tab as UITab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const paddingBySize = {
  sm: 'py-1',
  base: 'py-2',
};

function Tabs({ tabs, size }) {
  return (
    <UITab.Group>
      <UITab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-zinc-900/50">
        {tabs.map((tab) => (
          <UITab
            key={tab.name}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg text-sm leading-5 font-medium',
                'focus:ring-2 focus:ring-gray-200 focus:outline-none dark:focus:ring-zinc-700',
                paddingBySize[size],
                selected
                  ? 'bg-white text-gray-700 shadow dark:bg-zinc-800 dark:text-zinc-200 dark:shadow-zinc-900/70'
                  : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-gray-200',
              )
            }
          >
            {tab.name}
          </UITab>
        ))}
      </UITab.List>
      <UITab.Panels className="mt-2">
        {tabs.map(({ name, renderer }) => (
          <UITab.Panel
            key={name}
            className={classNames(
              'rounded-xl bg-white p-3 dark:bg-zinc-800',
              'ring-offset-2 focus:ring-2 focus:outline-none dark:focus:ring-zinc-700 dark:focus:ring-offset-zinc-800',
            )}
          >
            {renderer}
          </UITab.Panel>
        ))}
      </UITab.Panels>
    </UITab.Group>
  );
}

export default Tabs;

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      renderer: PropTypes.element.isRequired,
    }).isRequired,
  ).isRequired,
  size: PropTypes.oneOf(['sm', 'base']),
};

Tabs.defaultProps = {
  size: 'base',
};
