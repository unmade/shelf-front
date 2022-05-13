import React from 'react';
import PropTypes from 'prop-types';

import { Listbox as UIListbox, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

import * as icons from '../../icons';

function Listbox({ children, initial, options, onOptionChange }) {
  const [selectedOption, setSelectedOption] = React.useState(initial);
  const [referenceElement, setReferenceElement] = React.useState();
  const [popperElement, setPopperElement] = React.useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  const onChange = (option) => {
    setSelectedOption(option);
    if (onOptionChange != null) {
      onOptionChange(option);
    }
  };

  return (
    <UIListbox value={selectedOption} onChange={onChange}>
      {({ open }) => (
        <span className="z-10">
          <UIListbox.Button
            ref={setReferenceElement}
            className="rounded-xl ring-offset-2 focus:outline-none focus:ring"
          >
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
              ref={setPopperElement}
              style={styles.popper}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...attributes.popper}
              className="max-h-60 rounded-xl bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.map((option) => (
                <UIListbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'rounded-lg bg-gray-50 text-gray-900' : 'text-gray-900'
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
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
  onOptionChange: PropTypes.func,
};

Listbox.defaultProps = {
  onOptionChange: null,
};
