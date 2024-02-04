import React, { useRef, useState } from 'react';

import getFileEntries from '../../filereader';

export interface DropzoneProps {
  className?: string;
  render: React.ElementType;
  style: React.CSSProperties;
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

  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target !== dropRef.current) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropRef.current?.contains(event.relatedTarget as Node)) {
      setDragging(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const { items } = event.dataTransfer;
    const files = await getFileEntries(items);
    if (onDrop) {
      onDrop({ files, uploadTo });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
      style={style}
    >
      <View innerRef={dropRef} dragging={dragging} />
    </div>
  );
}
