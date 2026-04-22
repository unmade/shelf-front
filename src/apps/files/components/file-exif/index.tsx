import { Exif } from '@/components/Exif';
import { useGetContentMetadataQuery } from '@/store/files';

interface Props {
  fileId: string;
}

export function FileExif({ fileId }: Props) {
  const { data, isFetching, isError } = useGetContentMetadataQuery(fileId);
  const meta = data?.data;

  if (isFetching || isError || meta == null) {
    return null;
  }

  return <Exif data={meta} />;
}
