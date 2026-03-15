// This code is taken from: https://stackoverflow.com/a/53058574

// Wrap readEntries in a promise to make working with readEntries easier
// readEntries will return only some of the entries in a directory
// e.g. Chrome returns at most 100 entries at a time
async function readEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  try {
    return await new Promise<FileSystemEntry[]>((resolve, reject) => {
      directoryReader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get all the entries (files or sub-directories) in a directory
// by calling readEntries until it returns empty array
async function readDirectoryEntries(
  directoryReader: FileSystemDirectoryReader,
): Promise<FileSystemEntry[]> {
  const allEntries: FileSystemEntry[] = [];
  let entries: FileSystemEntry[];
  do {
    entries = await readEntries(directoryReader);
    allEntries.push(...entries);
  } while (entries.length > 0);

  return allEntries;
}

export default async function getFileEntries(
  dataTransferItemList: DataTransferItemList,
): Promise<FileSystemFileEntry[]> {
  const fileEntries: FileSystemFileEntry[] = [];
  // Use BFS to traverse entire directory/file structure
  const queue: FileSystemEntry[] = [];
  // Unfortunately dataTransferItemList is not iterable i.e. no forEach
  for (const item of Array.from(dataTransferItemList)) {
    const entry = item.webkitGetAsEntry();
    if (entry) {
      queue.push(entry);
    }
  }
  while (queue.length > 0) {
    const entry = queue.shift()!;
    if (entry.isFile) {
      fileEntries.push(entry as FileSystemFileEntry);
    } else if (entry.isDirectory) {
      queue.push(
        ...(await readDirectoryEntries((entry as FileSystemDirectoryEntry).createReader())),
      );
    }
  }
  return fileEntries;
}
