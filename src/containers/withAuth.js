import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


function withAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      const { auth, location, history } = this.props;
      if (!auth.tokens) {
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
    auth: state.auth,
  });

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}


export default withAuth;
