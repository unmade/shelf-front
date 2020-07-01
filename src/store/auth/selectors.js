function getAuth(state) {
  return state.auth;
}


export function getAccessToken(state) {
  return getAuth(state).accessToken;
}


export function getExpireAt(state) {
  return getAuth(state).expireAt;
}


export function getIsExpired(state) {
  return getExpireAt(state) && getExpireAt(state) < Date.now();
}


export function getIsLoading(state) {
  return getAuth(state).loading;
}


export function getErrorMessage(state) {
  return getAuth(state).errorMessage;
}


export function getIsAuthenticated(state) {
  return getAccessToken(state) && !getIsExpired(state);
}
