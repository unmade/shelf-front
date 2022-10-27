import React from 'react';

import * as icons from '../../icons';

function Loader() {
  return (
    <div className="flex h-full items-center justify-center">
      <icons.Spinner className="h-8 w-8 animate-spin text-gray-600" />
    </div>
  );
}

export default Loader;
