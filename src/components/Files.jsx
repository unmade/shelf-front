import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';


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
    const { data, loading } = this.props;
    const { directory, files } = data;

    return (
      <div>
        <div>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {directory.name}
          </div>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {this.loadFiles()}}
          hasMore={this.state.count < 200}
          className="p-8"
        >
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="w-1/32 px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="w-1/2 px-4 py-2 text-left">Name</th>
                <th className="w-1/16 px-4 py-2">Size</th>
                <th className="w-1/16 px-4 py-2">Modified</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, i) => (
                <tr key={i} className="border" style={{ borderLeft: 'none', borderRight: 'none' }}>
                  <td className="px-4 py-2 text-center">
                    <input type="checkbox"/>
                  </td>
                  <td className="px-4 py-4 text-black-600">{file.name}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{file.size}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{file.modified_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    )
  }
}

export default Files;
