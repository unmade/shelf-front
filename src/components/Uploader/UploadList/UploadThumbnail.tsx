import { useAppSelector } from 'hooks';

import { selectUploadById } from 'store/uploads/slice';

import FileIcon from 'components/FileIcon';

interface Props {
  className?: string;
  uploadId: string;
}

export default function UploadThumbnail({ className, uploadId }: Props) {
  const { name, mediatype, thumbnail } = useAppSelector((state) =>
    selectUploadById(state, uploadId),
  );
  if (thumbnail != null) {
    return <img className={`object-scale-down ${className}`} src={thumbnail} alt={name} />;
  }
  return <FileIcon className={className} mediatype={mediatype} />;
}
