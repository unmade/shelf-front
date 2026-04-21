import { Exif } from '@/components/Exif';
import { useGetMediaItemContentMetadataQuery } from '@/store/mediaItems';

interface Props {
  mediaItemId: string;
}

export default function MediaItemExif({ mediaItemId }: Props) {
  const { data, isFetching, isError } = useGetMediaItemContentMetadataQuery(mediaItemId);
  const meta = data?.data;

  if (isFetching || isError || meta == null) {
    return null;
  }

  return <Exif data={meta} />;
}
