import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import * as routes from './routes';

import withAdmin from './hoc/withAdmin';

import SideBar from './components/SideBar';

import Toast from './containers/Toast';
import ToastItem from './containers/ToastItem';

import Bookmarks from './pages/Bookmarks';
import Files from './pages/Files';
import Trash from './pages/Trash';
import UserManagement from './pages/admin/UserManagement';

function updateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function App() {
  React.useEffect(() => {
    updateVh();
    window.addEventListener('resize', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, []);

  return (
    <>
      <div className="shelf-h-screen flex bg-gray-100">
        <div className="hidden lg:block xl:w-64">
          <SideBar />
        </div>
        <div className="my-0 min-w-0 flex-1 bg-white shadow-sm">
          <Switch>
            <Route path={routes.FILES.route} component={Files} />
            <Route path={routes.BOOKMARKS.route} component={Bookmarks} />
            <Route path={routes.TRASH.route} component={Trash} />
            <Route path={routes.USER_MANAGEMENT.route} component={withAdmin(UserManagement)} />
            <Route exact path="/" render={() => <Redirect to={routes.FILES.prefix} />} />
          </Switch>
        </div>
      </div>

      <Toast itemRender={ToastItem} />
    </>
  );
}

export default App;
