import React from 'react';
import { Link } from 'react-router-dom';

import AccountMenu from '../containers/AccountMenu';

const menu = [
  // {
  //   path: "#",
  //   title: "All Photos",
  // },
  // {
  //   path: "#",
  //   title: "Albums",
  // },
  // {
  //   path: "#",
  //   title: "Faces",
  // },
  // {
  //   path: "#",
  //   title: "Places",
  // },
  // {
  //   path: "#",
  //   title: "Cameras",
  // },
  {
    path: "/files",
    title: "Files",
  },
]


const SideMenu = () => ( 
  <div className="flex flex-col h-full">
    <div className="py-2 m-2">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
    </div>

    <div className="py-2 m-2 text-base flex-1">
      <ul>
        {menu.map((item, i) => (
          <li key={i} className="py-2">
            <Link to={item.path} className="text-gray-700">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <AccountMenu />
    </div>

  </div>
)


export default SideMenu;
