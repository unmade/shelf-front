/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import * as icons from '../icons';

import Toast from '../containers/Toast';
import ToastItem from '../containers/ToastItem';

import Button from './ui/Button';
import Input from './ui/Input';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errors: null,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { authenticated } = this.props;
    if (authenticated) {
      this.redirect();
    }
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;
    if (authenticated !== prevProps.authenticated) {
      this.redirect();
    }
  }

  onInputChange(inputId) {
    return (event) => {
      const { errors } = this.state;
      const state = {};
      state[inputId] = event.target.value;
      this.setState(state);
      if (errors && errors[inputId]) {
        errors[inputId] = null;
        this.setState({ errors });
      }
    };
  }

  onSubmit() {
    if (this.validate()) {
      const { username, password } = this.state;
      const { onSubmit } = this.props;
      onSubmit(username, password);
    }
  }

  redirect() {
    const { location, history } = this.props;
    const redirectUrl = new URLSearchParams(location.search).get('next');
    if (redirectUrl) {
      history.push(redirectUrl);
    } else {
      history.push('/');
    }
  }

  validate() {
    const { username, password, errors: prevErrors } = this.state;
    const errors = {};
    let hasError = false;

    if (!username) {
      errors.username = 'This field is required';
      hasError = true;
    }

    if (!password) {
      errors.password = 'This field is required';
      hasError = true;
    }

    if (hasError) {
      this.setState({
        ...prevErrors,
        errors,
      });
    }

    return !hasError;
  }

  render() {
    const { loading } = this.props;
    const { errors } = this.state;

    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white max-w-md w-full py-12 px-6 rounded-md shadow">
            <div className="relative w-full inline-flex items-center space-x-4">
              <icons.AppLogo className="w-10 h-10 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-700">
                Shelf
              </h1>
            </div>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => { event.preventDefault(); this.onSubmit(); }}
            >
              <Input
                id="username"
                label="Username"
                placeholder="Username"
                error={errors && errors.username}
                onChange={this.onInputChange('username')}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                error={errors && errors.password}
                onChange={this.onInputChange('password')}
              />
              <div className="w-full pt-5">
                <Button
                  type="primary"
                  size="base"
                  onClick={this.onSubmit}
                  disabled={loading}
                  full
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
        <Toast itemRender={ToastItem} />
      </>
    );
  }
}

export default Login;
