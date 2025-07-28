import { generatePath } from 'react-router';

import * as routes from '../routes';

function useSharedLink({ token, filename }) {
  if (token == null || filename == null) {
    return null;
  }
  const pathParams = { token, filename: routes.encodePath(filename) };
  const pathname = generatePath(routes.SHARED_LINK_FILE.route, pathParams);
  return `${window.location.origin}${pathname}`;
}

export default useSharedLink;
