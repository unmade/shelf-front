import { useState } from 'react';

import { type SharedLinkFileSchema } from '@/store/sharedLinks';

import { Spinner } from '@/ui/spinner';

import { SharedLinkHeader } from './header';
import { SharedLinkSidePanel } from './side-panel';
import { SharedLinkSlide } from './slide';

interface Props {
  file?: SharedLinkFileSchema;
  token: string;
  loading: boolean;
}

export function SharedLinkPreview({ file, token, loading }: Props) {
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  if (loading || !file) {
    return <Spinner className="h-full w-full" />;
  }

  return (
    <div className="bg-background fixed inset-0 flex flex-col">
      <SharedLinkHeader
        fileName={file.name}
        sidePanelOpen={sidePanelOpen}
        onToggleSidePanel={() => setSidePanelOpen((prev) => !prev)}
      />
      <div className="flex min-h-0 flex-1">
        <div className="h-full min-w-0 flex-1 bg-gray-50 inset-shadow-xs dark:bg-zinc-950">
          <SharedLinkSlide file={file} token={token} />
        </div>
        <SharedLinkSidePanel file={file} token={token} open={sidePanelOpen} />
      </div>
    </div>
  );
}
