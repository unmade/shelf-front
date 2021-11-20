const API_BASE_URL = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export default API_BASE_URL;

export function ServerError(title = 'Server Error', description = 'Something went wrong') {
  this.title = title;
  this.description = description;
}
ServerError.prototype.toString = () => `${this.title}: ${this.description}`;

export function APIError(title = 'API Error', description) {
  this.title = title;
  this.description = description;
}
APIError.prototype.toString = () => `${this.title}: ${this.description}`;

function guessContentType(body) {
  if (body instanceof URLSearchParams) {
    return 'application/x-www-form-urlencoded; charset=UTF-8';
  }
  if (body instanceof FormData) {
    return 'multipart/form-data';
  }
  return 'application/json';
}

function* request(method, endpoint, accessToken, body = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': guessContentType(body),
    },
  };

  if (accessToken !== null) {
    options.headers.authorization = `Bearer ${accessToken}`;
  }

  if (body !== null) {
    if (body instanceof FormData || body instanceof URLSearchParams) {
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
    throw new APIError(errorMessage.code_verbose, errorMessage.message ?? 'Something went wrong');
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
