const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.2:8000';

export default API_BASE_URL;

export function ServerError(title = 'Server Error', description = 'Something went wrong') {
  this.title = title;
  this.description = description;
}
ServerError.prototype.toString = () => `${this.title}: "${this.description}"`;

export function APIError(title = 'API Error', description) {
  this.title = title;
  this.description = description;
}
APIError.prototype.toString = () => `${this.title}: "${this.description}"`;

function* request(method, endpoint, accessToken, body = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    mode: 'cors',
    cache: 'default',
  };

  if (accessToken !== null) {
    options.headers = {
      authorization: `Bearer ${accessToken}`,
    };
  }

  if (body !== null) {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  let response;
  try {
    response = yield fetch(url, options);
  } catch (e) {
    throw new ServerError();
  }
  if (!response.ok) {
    let errorMessage;
    try {
      errorMessage = yield response.json();
    } catch (e) {
      throw new ServerError();
    }
    throw new APIError(errorMessage.code_verbose, errorMessage.message);
  }

  return response;
}

export function* get(endpoint, accessToken) {
  return yield request('GET', endpoint, accessToken);
}

export function* post(endpoint, accessToken, body = null) {
  return yield request('POST', endpoint, accessToken, body);
}

export function* put(endpoint, accessToken, body = null) {
  return yield request('PUT', endpoint, accessToken, body);
}
