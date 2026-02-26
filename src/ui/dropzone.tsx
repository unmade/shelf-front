import { useRef, useState } from 'react';

import getFileEntries from 'filereader';

export interface DropzoneProps {
  className?: string;
  children: (props: { dragging: boolean }) => React.ReactNode;
  onDrop: (files: FileSystemFileEntry[]) => void;
}

export function Dropzone({ className = '', children, onDrop }: DropzoneProps) {
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
    dragCounter.current = 0;
    setDragging(false);

    const { items } = event.dataTransfer;
    const files = await getFileEntries(items);
    if (onDrop) {
      onDrop(files);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
    >
      {children({ dragging })}
    </div>
  );
}
