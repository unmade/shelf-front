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

  componenDidMount() {
    const { auth, location, history } = this.props;
    const redirect = new URLSearchParams(location.search).get("next");
    if (auth.tokens.access) {
      if (redirect) {
        history.push(redirect);
      } else {
        history.push("/");
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { auth, location, history } = this.props;
    const { auth: prevAuth } = prevProps;

    if (auth.error && auth.error !== prevAuth.error) {
      const { errors } = this.state;
      this.setState({
        errors: {
          ...errors,
          nonField: auth.error.message,
        }
      });
      return;
    }

    const redirect = new URLSearchParams(location.search).get("next");
    if (auth.tokens.access !== prevAuth.tokens.access) {
      if (redirect) {
        history.push(redirect);
      } else {
        history.push("/");
      }
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

  validate() {
    const { username, password, errors: prevErrors } = this.state;
    const errors = {};
    let hasError = false;

    if (!username) {
      errors.username = "This field is required";
      hasError = true;
    }

    if (!password) {
      errors.password = "This field is required";
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
    const { errors } = this.state;
    
    return (
      <div className="w-full max-w-xs mx-auto mt-16">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors && errors.username && "border-red-500"}`}
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.onInputChange("username")}
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors && errors.password && "border-red-500"}`}
              id="password"
              type="password"
              placeholder="******************"
              onChange={this.onInputChange("password")}
            />
            {errors && errors.username && (
              <p className="text-red-500 text-xs italic mt-3">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={this.onSubmit}
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Shelf. All rights reserved.
        </p>
      </div>
    );
  };
}


export default Login;
