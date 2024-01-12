import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Item = PropTypes.shape({
  name: PropTypes.string.isRequired,
  danger: PropTypes.bool.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
});

const MenuItem = React.forwardRef(({ item }, ref) => (
  <Button
    innerRef={ref}
    key={item.name}
    variant="text"
    color={item.danger ? 'danger' : 'primary'}
    onClick={(event) => {
      event.stopPropagation();
      item.onClick();
    }}
    full
  >
    <div className="my-1 flex w-full flex-row items-center whitespace-nowrap">
      <div className="mr-3">{item.icon}</div>
      <div>{item.name}</div>
    </div>
  </Button>
));

MenuItem.propTypes = {
  item: Item.isRequired,
};

export default MenuItem;
