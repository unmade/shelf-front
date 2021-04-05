import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getIsAuthenticated } from '../store/reducers/auth';

export default (Component) => {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      const { authenticated, location, history } = this.props;
      if (!authenticated) {
        const nextLocation = (location.pathname !== '/') ? location.pathname : '/files';
        history.push(`/signin?next=${nextLocation}`);
      }
    }

    render() {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...this.props}/>
      );
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: getIsAuthenticated(state),
  });

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
};
