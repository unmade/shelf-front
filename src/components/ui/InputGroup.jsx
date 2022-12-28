import React from 'react';

import { Children } from '../../types';

function InputGroup({ children }) {
  return <div className="group/input flex -space-x-px">{children}</div>;
}

InputGroup.propTypes = {
  children: Children.isRequired,
};

export default InputGroup;
