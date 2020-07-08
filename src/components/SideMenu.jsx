import React from 'react';
import { Link } from 'react-router-dom';

import AccountMenu from '../containers/AccountMenu';
import Upload from '../containers/Upload';

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
      <Upload />
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
