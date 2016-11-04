import stream from 'flyd-run';
import store from '../store';
import { isValidSession, refreshTime } from '../utils/auth';
import request from '../utils/request';
import reject from '../utils/reject';
import * as storage from '../utils/storage';

const API_URL = '/api/users';

const TIMER = 'auth';
const TOKEN = 'token';
const USER = 'user';

export function load() {
  const req = stream(storage.get(TOKEN));

  return req;
}

export function login({ email, password }, onError) {
  const req = request(`${API_URL}/login`, {
    method: 'POST',
    body: {
      password,
      email
    }
  });

  req.run(onTokenResponse);

  req.error.run(reject({ onError }));

  return req;
}

export function logout(onError) {
  const complete = stream();
  const req = request(`${API_URL}/logout`, {
    method: 'POST',
    token: true
  });

  const onComplete = () => {
    clear();
    complete(true);
  };

  req.run(onComplete);

  // always clear the local token data
  // - even on a server error
  req.error.run(reject({ onError, onExecute: onComplete }));

  return complete;
}

export function reset({ email }, onError) {
  const req = request(`${API_URL}/reset-request`, {
    method: 'POST',
    body: {
      email
    }
  });

  req.error.run(reject({ onError }));

  return req;
}

export function clear() {
  // nullify the state
  store.set(USER, null);
  store.set(TOKEN, null);
  store.timer(TIMER, null);
}

export function persist(token) {
  store.timer(TIMER, refresh, refreshTime(token));
}

export function refresh() {
  load().run((token) => {
    // do not request a new token if the current is nulled
    // or if the session has already been refreshed (peer tab)
    if (!token || isValidSession(token)) {
      if (token) {
        onTokenResponse(token);
      }
      return null;
    }

    const req = request(`${API_URL}/${token.userId}/accessTokens`, {
      method: 'POST',
      token: token.id
    });

    // silently fail and don't request again
    req.run(onTokenResponse);

    return req;
  });
}

// store the response,
// persist the access session via a timer
function onTokenResponse(body) {
  persist(store.set(TOKEN, body));
  return body;
}

