import React from 'react';
import PropTypes from 'prop-types';

import { Menu as UIMenu, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

function Menu({ buttonClassName, children, items, panelClassName, itemRender: Render }) {
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
  return (
    <UIMenu>
      {({ open }) => (
        <>
          <UIMenu.Button
            ref={setReferenceElement}
            className={`${buttonClassName} rounded-xl focus:outline-none focus:ring`}
          >
            {children}
          </UIMenu.Button>

          <Transition
            show={open}
            className="absolute z-10"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <UIMenu.Items
              static
              className={`${panelClassName} flex flex-col rounded-xl bg-white p-2 shadow focus:outline-none`}
              ref={setPopperElement}
              style={styles.popper}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...attributes.popper}
            >
              {items.map((item) => (
                <UIMenu.Item key={item.path || item.name}>
                  {({ active }) => <Render active={active} item={item} />}
                </UIMenu.Item>
              ))}
            </UIMenu.Items>
          </Transition>
        </>
      )}
    </UIMenu>
  );
}

Menu.propTypes = {
  buttonClassName: PropTypes.string,
  children: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  panelClassName: PropTypes.string,
  itemRender: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  buttonClassName: '',
  panelClassName: '',
};

export default Menu;
