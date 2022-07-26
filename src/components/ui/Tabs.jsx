import React from 'react';
import PropTypes from 'prop-types';

import { Tab as UITab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Tabs({ tabs }) {
  return (
    <UITab.Group>
      <UITab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <UITab
            key={tab.name}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2 text-sm font-medium leading-5 text-gray-700',
                'focus:outline-none focus:ring-2',
                selected ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
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
};
