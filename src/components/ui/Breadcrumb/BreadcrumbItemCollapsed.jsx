import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../../icons';

import Button from '../Button';

import BreadcrumbItem from './BreadcrumbItem';

function BreadcrumbItemCollapsed({ children, className, path, onClick }) {
  return (
    <BreadcrumbItem path={path} className={className} onClick={onClick}>
      <Button
        type="text"
        icon={<icons.Folder className="w-5 h-5 text-blue-400" />}
        full
      >
        {children}
      </Button>
    </BreadcrumbItem>
  );
}

BreadcrumbItemCollapsed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

BreadcrumbItemCollapsed.defaultProps = {
  className: '',
  onClick: null,
};

export default BreadcrumbItemCollapsed;
