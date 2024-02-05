import React from 'react';

import * as icons from '../icons';

import { MediaType } from '../constants';

interface Props {
  className?: string;
  hidden?: boolean;
  mediatype: string | null;
  shared?: boolean;
}

export default function FileIcon({ className, hidden = false, mediatype, shared = false }: Props) {
  let color;
  if (mediatype === MediaType.FOLDER) {
    color = hidden ? 'text-blue-200 dark:text-blue-500/50' : 'text-blue-400';
  } else {
    color = hidden ? 'text-gray-300 dark:text-zinc-600' : 'text-gray-400 dark:text-zinc-500';
  }

  const Icon = icons.getIcon(mediatype, shared);
  return <Icon className={`${color} ${className}`} />;
}
