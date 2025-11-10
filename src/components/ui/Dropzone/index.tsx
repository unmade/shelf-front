import { useRef, useState } from 'react';

import getFileEntries from 'filereader';

export interface DropzoneProps {
  className?: string;
  render: React.ElementType;
  style?: React.CSSProperties;
  uploadTo: string;
  onDrop: ({ files, uploadTo }: { files: FileSystemFileEntry[]; uploadTo: string }) => void;
}

export default function Dropzone({
  className = '',
  render: View,
  style,
  uploadTo = '',
  onDrop,
}: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current < 1) {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dragging) {
      setDragging(false);
    }

    const { items } = event.dataTransfer;
    const files = await getFileEntries(items);
    if (onDrop) {
      onDrop({ files, uploadTo });
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
      style={style}
    >
      <View dragging={dragging} />
    </div>
  );
}
