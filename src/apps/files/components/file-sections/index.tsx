import { type FileSchema } from '@/store/files';

import { cn } from '@/lib/utils';

import { MediaType } from '@/constants';
import * as routes from '@/routes';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

import Breadcrumbs from '@/components/Breadcrumbs';
import Exif from '@/components/Exif';
import SharedLinkSetting from '@/components/SharedLinkSetting';

interface PropertyProps {
  className?: string;
  label: string;
  value: React.ReactNode;
}

export function Property({ className = '', label, value }: PropertyProps) {
  return (
    <div className={cn('flex items-start justify-between py-1', className)}>
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="max-w-2/3 truncate text-right text-xs">{value}</span>
    </div>
  );
}

interface InfoSectionProps {
  file: FileSchema;
}

function InfoSection({ file }: InfoSectionProps) {
  const breadcrumbs = routes
    .breadcrumbs(file.path)
    .slice(0, -1)
    .map(({ key, name }) => ({
      key,
      name,
    }));

  return (
    <div className="space-y-0.5">
      <Property
        label="Location"
        value={<Breadcrumbs className="text-xs" items={breadcrumbs} collapseAfter={2} />}
      />
      {<Property label="Size" value={<FileSize bytes={file.size} />} />}
      <Property label="Modified" value={<TimeAgo value={file.modified_at} format="LLL" />} />
    </div>
  );
}

interface SidePanelSectionsProps {
  className?: string;
  file: FileSchema;
}

export function FileSections({ className, file }: SidePanelSectionsProps) {
  const isImage = MediaType.isImage(file.mediatype);

  const items = [
    {
      value: 'info',
      trigger: 'Information',
      content: <InfoSection file={file} />,
    },
    {
      value: 'sharing',
      trigger: 'Sharing',
      content: <SharedLinkSetting file={file} />,
    },
  ];

  if (isImage) {
    items.push({
      value: 'exif',
      trigger: 'Exif',
      content: <Exif fileId={file.id} />,
    });
  }

  return (
    <Accordion className={className} type="multiple" defaultValue={['info', 'sharing']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
