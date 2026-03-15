import { Link, resolvePath, useLocation, useParams, useSearchParams } from 'react-router';

import { PREVIEW_PARAM, TRASH_FOLDER_NAME } from '@/constants';
import * as routes from '@/routes';

const trashPrefix = `${TRASH_FOLDER_NAME}/`.toLocaleLowerCase();

function normalizePath(path: string): string {
  if (path.toLowerCase().startsWith(trashPrefix)) {
    return path.slice(trashPrefix.length);
  }
  if (path.toLowerCase() === TRASH_FOLDER_NAME.toLocaleLowerCase()) {
    return '.';
  }
  return path;
}

interface FolderLinkProps {
  children: React.ReactNode;
  className?: string;
  path: string;
  replace?: boolean;
}

function FolderLink({ children, className, path, replace }: FolderLinkProps) {
  const prefix = routes.isTrashed(path) ? routes.TRASH.prefix : routes.FILES.prefix;
  const url = resolvePath(routes.encodePath(normalizePath(path)), prefix);

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
  );
}

interface PreviewLinkProps {
  children: React.ReactNode;
  className?: string;
  path: string;
  replace?: boolean;
}

function PreviewLink({ children, className, path, replace }: PreviewLinkProps) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { '*': dirPath } = useParams();

  const currentDir = pathname.startsWith(routes.TRASH.prefix)
    ? routes.join(trashPrefix, dirPath!)
    : dirPath;

  const parentDir = routes.parent(path) ?? '.';
  const preview = parentDir === currentDir ? routes.basename(path) : path;

  const params = new URLSearchParams(searchParams);
  params.set(PREVIEW_PARAM, preview);

  const url = { search: params.toString() };

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
  );
}

interface FileLinkProps {
  children: React.ReactNode;
  className?: string;
  path: string;
  preview?: boolean;
  replace?: boolean;
}

export function FileLink({ children, className, path, preview, replace }: FileLinkProps) {
  const LinkRenderer = preview ? PreviewLink : FolderLink;

  return (
    <LinkRenderer className={className} path={path} replace={replace}>
      {children}
    </LinkRenderer>
  );
}
