import React from 'react';
import PropTypes from 'prop-types';

import { BREADCRUMBS_ALIASES } from '../../constants';

const smallText = 'text-xs space-x-1';
const largeText = 'text-xl space-x-2';

function breadcrumbsFromPath(path, aliases = BREADCRUMBS_ALIASES) {
  const breadcrumbs = [];
  const parts = path.split('/').filter((e) => e !== '');
  let prefix = '';
  parts.forEach((part) => {
    prefix = (part !== '.') ? `${prefix}/${part}` : part;
    breadcrumbs.push({
      path: prefix,
      name: (aliases && aliases[part]) || part,
    });
  });

  return breadcrumbs;
}

function Breadcrumbs({ size, path, itemRender: Render }) {
  const textSize = (size === 'small') ? smallText : largeText;
  const items = breadcrumbsFromPath(path);

  return (
    <nav className={`flex flex-row items-center ${textSize} text-gray-600`}>
      {(items.map((item, idx) => (
        <React.Fragment key={item.path}>
          <Render key={item.path} name={item.name} path={item.path} />
          {(idx !== (items.length - 1)) && <span>&#8250;</span>}
        </React.Fragment>
      )))}
    </nav>
  );
}

Breadcrumbs.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.func.isRequired,
};

Breadcrumbs.defaultProps = {
  size: 'large',
};

export default Breadcrumbs;
