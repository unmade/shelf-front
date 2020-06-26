import React from 'react';
import * as icons from '../icons';


function Breadcrumbs({ children }) {
  return (
    <nav className="flex flex-row items-center space-x-2 text-xl text-gray-600">
      {(children.length) ? (
        children.map((child, idx) => (
          <span key={idx} className="flex flex-row items-center space-x-2">
            {child}
            {(idx !== (children.length - 1)) && <icons.ChevronRight className="text-xs" />}
          </span>
        ))
      ) : (
        children
      )}
    </nav>
  )
};

export default Breadcrumbs;
