import { useAppSelector } from 'hooks';

import type { UploadsFilter } from 'store/uploads/slice';
import { selectVisibleUploads } from 'store/uploads/slice';

import VList from 'components/ui-legacy/VList';

import UploadListItem from './UploadListItem';

interface Props {
  visibilityFilter: UploadsFilter;
}

export default function UploadList({ visibilityFilter }: Props) {
  const uploads = useAppSelector((state) =>
    selectVisibleUploads(state, { filter: visibilityFilter }),
  );
  return <VList itemCount={uploads.length} itemData={uploads} itemRender={UploadListItem} />;
}
