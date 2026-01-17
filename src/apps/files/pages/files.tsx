import useDirPath from '@/hooks/dir-path';

import * as routes from '@/routes';

import { Heading } from '@/ui/heading';

import GoBackButton from '@/components/GoBackButton';
import Uploader from '@/components/Uploader';

import { FileBrowser } from '@/apps/files/components/FileBrowser';
import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/apps/files/components/page';

export default function Files() {
  const dirPath = useDirPath();

  const title = routes.folderName(dirPath);

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>
          <>
            <GoBackButton to={routes.parent(dirPath)} disabled={routes.isRoot(dirPath)} />
            <Heading>{title}</Heading>
          </>
        </PageHeaderTitle>
        <PageHeaderActions>
          <Uploader uploadTo={dirPath ?? '.'} />
        </PageHeaderActions>
      </PageHeader>
      <PageContent>
        <FileBrowser path={dirPath ?? '.'} />
      </PageContent>
    </Page>
  );
}
