import { INITIAL_STATE } from './reducers';
import { getTokens } from './selectors';

const KEY = 'state.auth.tokens';


export function saveAuthState(state) {
  const tokens = getTokens(state);
  if (tokens !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify(tokens));
  }
}


export function loadAuthState() {
  const tokens = JSON.parse(localStorage.getItem(KEY)) || null;
  return {
    auth: {
      ...INITIAL_STATE,
      tokens,
    },
  };
}
