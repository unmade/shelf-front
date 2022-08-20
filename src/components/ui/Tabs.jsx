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
      <UITab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <UITab
            key={tab.name}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-1 text-sm font-medium leading-5 ',
                'focus:outline-none focus:ring-2',
                paddingBySize[size],
                selected
                  ? 'bg-white text-gray-700 shadow'
                  : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              )
            }
          >
            {tab.name}
          </UITab>
        ))}
      </UITab.List>
      <UITab.Panels className="mt-2">
        {tabs.map(({ name, render }) => (
          <UITab.Panel
            key={name}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-offset-2 focus:outline-none focus:ring-2'
            )}
          >
            {render}
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
      render: PropTypes.element.isRequired,
    }).isRequired
  ).isRequired,
  size: PropTypes.oneOf(['sm', 'base']),
};

Tabs.defaultProps = {
  size: 'base',
};
