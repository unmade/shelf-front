import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isAuthenticated } from '../store/auth/selectors';


function withAuth(Component) {
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
        history.push(`/signin?next=${location.pathname}`);
      }
    }

    render() {
      return (
        <Component {...this.props}/>
      )
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: isAuthenticated(state),
  });

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}


export default withAuth;
