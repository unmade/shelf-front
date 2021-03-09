const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

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

export function* post(endpoint, accessToken, payload = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  if (payload !== null) {
    options.body = JSON.stringify(payload);
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
    throw new APIError('API Error', errorMessage.message);
  }

  return response;
}
