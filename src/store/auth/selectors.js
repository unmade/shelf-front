function getAuth(state) {
  return state.auth;
}


export function getAccessToken(state) {
  return getAuth(state).accessToken;
}


export function isLoading(state) {
  return getAuth(state).loading;
}


export function getErrorMessage(state) {
  return getAuth(state).errorMessage;
}


export function isAuthenticated(state) {
  // should also check token is not expired;
  return !!getAccessToken(state);
}
