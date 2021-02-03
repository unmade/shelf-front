/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

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
    const { authenticated, errorMessage } = this.props;

    if (errorMessage !== prevProps.errorMessage) {
      const { errors } = this.state;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        errors: {
          ...errors,
          nonField: errorMessage,
        },
      });
      return;
    }

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
      <div className="w-full max-w-xs mx-auto mt-16">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(event) => { event.preventDefault(); this.onSubmit(); }}
        >
          {errors && errors.nonField && (
            <div className="border border-red-500 bg-red-100 rounded mb-3">
              <p className="text-red-500 text-xs italic p-2">{errors.nonField}</p>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors && errors.username && 'border-red-500'}`}
              type="text"
              placeholder="Username"
              onChange={this.onInputChange('username')}
            />
            {errors && errors.username && (
              <p className="text-red-500 text-xs italic mt-3">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${errors && errors.password && 'border-red-500'}`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={this.onInputChange('password')}
            />
            {errors && errors.username && (
              <p className="text-red-500 text-xs italic mt-3">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
              onClick={this.onSubmit}
              disabled={loading}
            >
              Sign In
            </button>
            <button type="button" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Shelf. All rights reserved.
        </p>
      </div>
    );
  }
}

export default Login;
