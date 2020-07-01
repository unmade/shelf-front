import { INITIAL_STATE } from './reducers';
import { getAccessToken } from './selectors';

const KEY = 'accessToken';


export function saveAuthState(state) {
  const token = getAccessToken(state);
  if (token !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, token);
  }
}


export function loadAuthState() {
  const accessToken = localStorage.getItem(KEY);
  return {
    auth: {
      ...INITIAL_STATE,
      accessToken,
    },
  };
}
