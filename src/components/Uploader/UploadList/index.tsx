import type { UploadsFilter } from '@/store/uploads/slice';
import { selectVisibleUploads } from '@/store/uploads/slice';

import { useAppSelector } from '@/hooks';

import { VList } from '@/ui/vlist';

import UploadListItem from './UploadListItem';

interface Props {
  visibilityFilter: UploadsFilter;
}

export default function UploadList({ visibilityFilter }: Props) {
  const uploads = useAppSelector((state) =>
    selectVisibleUploads(state, { filter: visibilityFilter }),
  );
  return <VList itemCount={uploads.length} itemData={uploads} itemRenderer={UploadListItem} />;
}
