import React from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import * as icons from '../icons';


class Files extends React.Component {
  state = {
    count: 0,
    checked: false,
  };

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps
    if (prevMatch.params.dirPath !== match.params.dirPath) {
      this.loadFiles();
    }
  }

  loadFiles() {
    const { match, listFiles } = this.props;
    listFiles({ path: match.params.dirPath });
    this.state.count++;
  }

  render() {
    const { data } = this.props;
    const { directory, files } = data;

    return (
      <div className="h-full">

        <div style={{ height: '50px' }} className="flex flex-row items-center space-x-4 text-sm font-bold">
          <div>
            <input type="checkbox" />
          </div>
          <div className="w-3/4">
            Name
          </div>
          <div className="text-right">
            Size
          </div>
          <div className="w-1/4 text-center">
            Modified
          </div>
        </div>

        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={files.length}
              itemSize={50}
              width={width}
            >
              {({ index, style }) => {
                const file = files[index];

                return (
                  <div style={style}>
                    <div className="h-full flex flex-row items-center space-x-4 text-sm" style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <input type="checkbox" />
                      </div>
                      <div className="w-3/4">
                        <div className="flex flex-row">
                          {(file.type === "folder") ? (
                            <icons.Folder className="text-2xl text-blue-400" />
                          ) : (
                            <icons.FileImage className="text-2xl" />
                          )}
                          <Link to={`/files/${directory.path}/${file.path}`} className="mx-2">
                            {file.name}
                          </Link>
                        </div>
                      </div>
                      <div className="text-right text-gray-600">
                        {file.size}
                      </div>
                      <div className="w-1/4 text-center text-gray-600">
                        {file.modified_at}
                      </div>
                    </div>
                  </div>
                )
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default Files;
