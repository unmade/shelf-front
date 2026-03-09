import { useTranslation } from 'react-i18next';

import type { FileSchema } from '@/store/files';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

import { Property } from '@/apps/files/components/file-sections';

import { SidePreviewActions } from './actions';
import { SidePreviewHeader } from './header';

interface InfoSectionProps {
  files: FileSchema[];
}

function InfoSection({ files }: InfoSectionProps) {
  const { t } = useTranslation('files');
  const size = files.reduce((acc, item) => acc + item.size, 0);

  const sorted = files.sort((a, b) => Date.parse(a.modified_at) - Date.parse(b.modified_at));
  const minModifiedAt = sorted[0]?.modified_at;
  const maxModifiedAt = sorted[sorted.length - 1]?.modified_at;

  return (
    <div className="space-y-0.5">
      {
        <Property
          label={t('properties.size', { defaultValue: 'Size' })}
          value={<FileSize bytes={size} />}
        />
      }
      <Property
        label={t('properties.modified', { defaultValue: 'Modified' })}
        value={
          <>
            <TimeAgo value={minModifiedAt} format="ll" />
            &nbsp;-&nbsp;
            <TimeAgo value={maxModifiedAt} format="ll" />
          </>
        }
      />
    </div>
  );
}

interface SidePreviewSectionsProps {
  files: FileSchema[];
}

function SidePreviewSections({ files }: SidePreviewSectionsProps) {
  const { t } = useTranslation('files');
  const items = [
    {
      value: 'info',
      trigger: t('sections.information', { defaultValue: 'Information' }),
      content: <InfoSection files={files} />,
    },
  ];

  return (
    <Accordion type="multiple" className="max-w-lg" defaultValue={['info', 'sharing']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface MultipleFilesPreviewProps {
  files: FileSchema[];
}

export function MultipleFilesPreview({ files }: MultipleFilesPreviewProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SidePreviewHeader files={files} />
      <SidePreviewActions files={files} />
      <SidePreviewSections files={files} />
    </div>
  );
}
