import { INITIAL_STATE } from './reducers';
import { getAccessToken, getExpireAt } from './selectors';

const KEY = 'state.auth';


export function saveAuthState(state) {
  const accessToken = getAccessToken(state);
  const expireAt = getExpireAt(state);
  const authState = JSON.stringify({ accessToken, expireAt });
  if (authState !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, authState);
  }
}


export function loadAuthState() {
  const authState = JSON.parse(localStorage.getItem(KEY)) || {};
  return {
    auth: {
      ...INITIAL_STATE,
      ...authState,
    }
  };
}
