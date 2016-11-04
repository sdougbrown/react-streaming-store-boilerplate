import stream from 'flyd-run';
import { state } from '../store';

// timeout cached tokens earlier than the true ttl
const TTL_LATENCY = 300;

/**
 * expires
 *
 * Determines when the current token will expire
 * (simple ttl calc: created time vs now vs ttl)
 *
 * @returns {Number}
 */
export function expires(token) {
  const data = token || state.token();

  if (!data) {
    return 0;
  }

  const created = new Date(data.created);
  const ttlDiff = Date.now() - created.getTime();

  return data.ttl - ttlDiff;
}

/**
 * refreshTime
 *
 * Determines when a new access token should be requested
 * in order to keep the current session alive.
 *
 * @returns {Number}
 */
export function refreshTime(token) {
  return expires(token) - TTL_LATENCY;
}

/**
 * isValidSession
 *
 * Determines if the user has a valid session by verifying the
 * presence of a token object in state, and then checking the
 * validity of that token (see `expires`)
 *
 * @returns {Boolean}
 */
export function isValidSession() {
  if (expires() < TTL_LATENCY) {
    return false;
  }

  return true;
}

/**
 * isAdmin
 *
 * Determines if the user has access to view admin controls
 *
 * it is theoretically possible to spoof this via a proxied
 * response, but the real back-end validates any actions
 * (read or write), so the security exposure is minor.
 *
 * @returns {Boolean}
 */
export function isAdmin() {
  const data = state.user();

  if (!data) {
    // maybe fetch user data?
    // probably unnecessary
    // - likely to be used in a lifecycle fn to set state
    return false;
  }

  return Boolean(data.isAdmin);
}

/**
 * authorize
 *
 * A thin wrapper around `isValidSession` that acts in an async manner
 * (but only checks once rather than recursively to avoid danger).
 *
 * This is better-suited to a route `onmatch` method where we need to know
 * for certain that the user has a valid session.
 *
 * @returns {Stream}
 */
export function authorize() {
  const valid = stream();

  if (state.isInitialized()) {
    valid(isValidSession());
  } else {
    state.isInitialized.run((up) => {
      if (up) {
        valid(isValidSession());
      }
    });
  }

  return valid;
}

/**
 * accessToken
 *
 * a quick helper to safely snag the active access token
 *
 * @returns {string}
 */
export function accessToken() {
  if (!state.token()) {
    return '';
  }

  return state.token().id;
}

/**
 * addAuthHeader
 *
 * Accepts an (optional) token and returns
 * a config handler that will append the given token
 * to the raw xhr config object
 *
 * @param {string} token
 * @returns {Function}
 */
export function addAuthHeader(token) {
  const authToken = token || accessToken();

  return (xhr) => {
    xhr.setRequestHeader('Authorization', authToken);
    return xhr;
  };
}

