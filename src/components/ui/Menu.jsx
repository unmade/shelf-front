import React from 'react';
import PropTypes from 'prop-types';

import { useFloating, flip, offset } from '@floating-ui/react-dom';
import { Menu as UIMenu, Transition } from '@headlessui/react';

function Menu({ buttonClassName, children, items, panelClassName, itemRender: Render }) {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(5), flip()],
  });

  return (
    <UIMenu>
      {({ open }) => (
        <>
          <UIMenu.Button
            ref={reference}
            className={`${buttonClassName} rounded-xl focus:outline-none`}
            onClick={(event) => {
              event.stopPropagation();
            }}
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
              className={`${panelClassName} flex flex-col rounded-xl bg-white p-2 shadow focus:outline-none dark:bg-zinc-800 dark:shadow-zinc-900/70`}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
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
  itemRender: PropTypes.elementType.isRequired,
};

Menu.defaultProps = {
  buttonClassName: '',
  panelClassName: '',
};

export default Menu;
