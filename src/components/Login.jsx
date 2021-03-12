/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

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
        <div className="w-full max-w-xs mx-auto mt-16">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(event) => { event.preventDefault(); this.onSubmit(); }}
          >
            <div className="mb-4">
              <Input
                id="username"
                label="Username"
                placeholder="Username"
                error={errors && errors.username}
                onChange={this.onInputChange('username')}
              />
            </div>
            <div className="mb-6">
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                error={errors && errors.password}
                onChange={this.onInputChange('password')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="primary"
                size="md"
                onClick={this.onSubmit}
                disabled={loading}
              >
                Sign In
              </Button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2021 Shelf. All rights reserved.
          </p>
        </div>
        <Toast itemRender={ToastItem} />
      </>
    );
  }
}

export default Login;
