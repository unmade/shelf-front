import React from 'react';
import PropTypes from 'prop-types';

import { useFloating, offset } from '@floating-ui/react-dom';
import { Listbox as UIListbox, Transition } from '@headlessui/react';

import * as icons from '../../icons';

function Listbox({ children, initial, options, placement, onOptionChange }) {
  const [selectedOption, setSelectedOption] = React.useState(initial);
  const { x, y, reference, floating, strategy } = useFloating({
    placement,
    middleware: [offset(5)],
  });

  const onChange = (option) => {
    setSelectedOption(option);
    if (onOptionChange != null) {
      onOptionChange(option);
    }
  };

  return (
    <UIListbox value={selectedOption} by="value" onChange={onChange}>
      {({ open }) => (
        <span className="z-10">
          <UIListbox.Button as="span" ref={reference}>
            {children}
          </UIListbox.Button>

          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UIListbox.Options
              static
              ref={floating}
              className="max-h-60 rounded-xl bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:shadow-zinc-900/50 dark:ring-offset-zinc-800 sm:text-sm"
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
            >
              {options.map((option) => (
                <UIListbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 dark:text-zinc-200 ${
                      active ? 'rounded-lg bg-gray-50 dark:bg-zinc-700/30' : ''
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-zinc-300">
                          <icons.Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </UIListbox.Option>
              ))}
            </UIListbox.Options>
          </Transition>
        </span>
      )}
    </UIListbox>
  );
}

export default Listbox;

Listbox.propTypes = {
  children: PropTypes.element.isRequired,
  initial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  placement: PropTypes.oneOf(['start-end', 'bottom-end', 'right-end', 'top-end']),
  onOptionChange: PropTypes.func,
};

Listbox.defaultProps = {
  placement: 'bottom-end',
  onOptionChange: null,
};
