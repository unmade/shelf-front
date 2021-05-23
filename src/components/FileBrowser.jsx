import React from 'react';

import FilePreview from '../containers/FilePreview';

import Browser from './Browser';

class FileBrowser extends React.Component {
  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (match.params.dirPath !== prevMatch.params.dirPath) {
      this.loadFiles();
    }
  }

  loadFiles() {
    const { match, listFolder, deselectFiles, changePath } = this.props;
    const { dirPath } = match.params;
    changePath(dirPath);
    listFolder(dirPath);

    // we want to deselect all files when
    // current directory has changed
    deselectFiles();
  }

  render() {
    const { match, location, hasSelectedFiles } = this.props;
    const { dirPath } = match.params;

    const { search } = location;
    const queryParams = new URLSearchParams(search);
    const preview = queryParams.get('preview');

    return (
      <>
        <Browser dirPath={dirPath} hasSelectedFiles={hasSelectedFiles} />
        {(preview) && (
          <FilePreview dirPath={dirPath || '.'} name={preview} />
        )}
      </>
    );
  }
}

export default FileBrowser;
