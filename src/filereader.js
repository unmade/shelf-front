// This code is taken from: https://stackoverflow.com/a/53058574

// Wrap readEntries in a promise to make working with readEntries easier
// readEntries will return only some of the entries in a directory
// e.g. Chrome returns at most 100 entries at a time
async function readEntries(directoryReader) {
  try {
    return await new Promise((resolve, reject) => {
      directoryReader.readEntries(resolve, reject);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err, err.stack);
    return [];
  }
}

// Get all the entries (files or sub-directories) in a directory
// by calling readEntries until it returns empty array
async function readDirectoryEntries(directoryReader) {
  const allEntries = [];
  let entries;
  do {
    // eslint-disable-next-line no-await-in-loop
    entries = await readEntries(directoryReader);
    allEntries.push(...entries);
  } while (entries.length > 0);

  return allEntries;
}

async function getFileEntries(dataTransferItemList) {
  const fileEntries = [];
  // Use BFS to traverse entire directory/file structure
  const queue = [];
  // Unfortunately dataTransferItemList is not iterable i.e. no forEach
  for (let i = 0; i < dataTransferItemList.length; i += 1) {
    queue.push(dataTransferItemList[i].webkitGetAsEntry());
  }
  while (queue.length > 0) {
    const entry = queue.shift();
    if (entry.isFile) {
      fileEntries.push(entry);
    } else if (entry.isDirectory) {
      // eslint-disable-next-line no-await-in-loop
      queue.push(...(await readDirectoryEntries(entry.createReader())));
    }
  }
  return fileEntries;
}

export default getFileEntries;
