import React from 'react';
import { useParams } from 'react-router-dom';


function FilePreview({ file }) {
  const { dirPath } = useParams();
  const path = `http://localhost:8000/static/${dirPath}/${file}`;

  return (
    <div className="fixed top-0 right-0 m-4 bg-white shadow-md w-1/4 z-10 rounded-lg" style={{ height: 'calc(100% - 2rem)' }}>
      <div className="flex flex-col p-4 h-full">
        <div className="text-center pb-2">
          <div>
            <p>{file}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">
              21 June 2020, 12:05
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-row items-center border rounded">
          <img src={path} className="object-contain h-full mx-auto" />
        </div>

        <div className="h-48" />

      </div>
    </div>
  );
}


export default FilePreview;
