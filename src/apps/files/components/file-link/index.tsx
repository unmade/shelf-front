import { Link, useResolvedPath } from 'react-router';

import * as routes from '@/routes';

const trashPrefix = 'trash/';

interface FolderLinkProps {
  children: React.ReactNode;
  className?: string;
  path: string;
  replace?: boolean;
}

function FolderLink({ children, className, path, replace }: FolderLinkProps) {
  const url = useResolvedPath(routes.encodePath(path));

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
  const { pathname: dirPath } = useResolvedPath('.');

  const url = `${dirPath}?preview=${path}`;

  return (
    <Link to={`..${url}`} className={className} replace={replace}>
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
  if (path.toLowerCase().startsWith(trashPrefix)) {
    path = path.slice(trashPrefix.length);
  }
  if (path.toLowerCase() === 'trash') {
    path = '';
  }

  const LinkRenderer = preview ? PreviewLink : FolderLink;

  return (
    <LinkRenderer className={className} path={path} replace={replace}>
      {children}
    </LinkRenderer>
  );
}
