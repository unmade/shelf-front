export function getAuth(state) {
  return state.auth;
}


export function getTokens(state) {
  return getAuth(state).tokens;
}
