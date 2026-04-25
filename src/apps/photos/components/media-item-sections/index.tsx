import { useTranslation } from 'react-i18next';

import type { IMediaItem } from '@/types/photos';

import { MediaType } from '@/constants';

import { cn } from '@/lib/utils';

import { useAppSelector } from '@/hooks';

import { selectPhotosLibraryPath } from '@/store/features';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

import MediaItemExif from '@/apps/photos/components/media-item-exif';

interface PropertyProps {
  className?: string;
  label: string;
  value: React.ReactNode;
}

function Property({ className = '', label, value }: PropertyProps) {
  return (
    <div className={cn('flex items-start justify-between py-1', className)}>
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="max-w-2/3 truncate text-right text-xs">{value}</span>
    </div>
  );
}

interface InfoSectionProps {
  mediaItem: IMediaItem;
}

function InfoSection({ mediaItem }: InfoSectionProps) {
  const { t } = useTranslation('photos');
  const libraryPath = useAppSelector(selectPhotosLibraryPath);
  const location = libraryPath === '.' ? '—' : libraryPath;

  return (
    <div className="space-y-0.5">
      <Property label={t('properties.location', { defaultValue: 'Location' })} value={location} />
      <Property
        label={t('properties.size', { defaultValue: 'Size' })}
        value={<FileSize bytes={mediaItem.size} />}
      />
      {mediaItem.takenAt && (
        <Property
          label={t('exif.dateTaken', { defaultValue: 'Date Taken' })}
          value={<TimeAgo value={mediaItem.takenAt} format="LLL" />}
        />
      )}
      <Property
        label={t('properties.modified', { defaultValue: 'Modified' })}
        value={<TimeAgo value={mediaItem.modifiedAt} format="LLL" />}
      />
    </div>
  );
}

interface MediaItemSectionsProps {
  className?: string;
  mediaItem: IMediaItem;
}

export function MediaItemSections({ className, mediaItem }: MediaItemSectionsProps) {
  const { t } = useTranslation('photos');
  const isImage = MediaType.isImage(mediaItem.mediaType);

  const items = [
    {
      value: 'info',
      trigger: t('sections.information', { defaultValue: 'Information' }),
      content: <InfoSection mediaItem={mediaItem} />,
    },
  ];

  if (isImage) {
    items.splice(1, 0, {
      value: 'exif',
      trigger: t('sections.exif', { defaultValue: 'Exif' }),
      content: <MediaItemExif mediaItemId={mediaItem.id} />,
    });
  }

  return (
    <Accordion className={className} type="multiple" defaultValue={['info', 'exif']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
