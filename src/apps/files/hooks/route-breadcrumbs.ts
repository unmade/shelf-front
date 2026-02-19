import { useMemo } from 'react';
import { useLocation } from 'react-router';

import * as routes from '@/routes';

export function useRouteBreadcrumbs() {
  const { pathname } = useLocation();
  return useMemo(() => routes.breadcrumbsFromUrl(pathname), [pathname]);
}
