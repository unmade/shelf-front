import { useTranslation } from 'react-i18next';

import type { UploadsFilter } from '@/store/uploads/slice';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

import UploadsPanel from './UploadsPanel';

export default function RecentUploads() {
  const { t } = useTranslation('uploads');

  const tabs: { key: UploadsFilter; name: string }[] = [
    {
      key: 'all',
      name: t('uploads:tab.all.title'),
    },
    {
      key: 'inProgress',
      name: t('uploads:tab.inProgress.title'),
    },
    {
      key: 'failed',
      name: t('uploads:tab.failed.title'),
    },
  ];

  return (
    <div className="mt-6">
      <p className="mb-2 font-semibold">{t('uploads:title')}</p>

      <Tabs defaultValue={tabs[0].key} className="w-full">
        <TabsList className="w-full">
          {tabs.map(({ key, name }) => (
            <TabsTrigger key={key} value={key}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ key }) => (
          <TabsContent key={key} value={key}>
            <UploadsPanel visibilityFilter={key} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
