import stream from 'flyd-run';
import actions from './actions/';
import { authorize, isValidSession } from './utils/auth';
import { isIs } from './utils/is';
import * as storage from './utils/storage';

// app state values
export const state = {
  user: stream(null),
  token: stream(null),
  isInitialized: stream(), // intentionally pending
};

export const timers = {};

// core storage api
const store = {
  isValidSession,

  authorize(data, err) {
    // check authorization if no args supplied
    if (arguments.length < 1) {
      return authorize();
    }

    // log out if null data
    if (!data) {
      return actions.auth.logout(err);
    }

    // log in with supplied data
    return actions.auth.login(data, err);
  },

  // expose state object as part of the store
  state,

  // timer store to make it 'easier' to call/track/cancel timeouts
  timer(key, cb, timing) {
    // always clear dupes
    if (timers[key]) {
      clearTimeout(timers[key]);
      delete timers[key];
    }

    if (!cb) {
      return null;
    }

    if (timing) {
      timers[key] = setTimeout(cb, timing);
    }

    return timers[key];
  },

  // transient states - only matters for the current session
  get(key) {
    if (!state[key]) {
      return null;
    }

    return state[key]();
  },

  set(key, value) {
    if (!state[key]) {
      state[key] = stream(value);
      return value;
    }

    // save to localStorage without jank.
    storage.set(key, value);

    return state[key](value).val;
  },

  // persist to / load from server
  load(type, ...args) {
    if (!actions[type] || !actions[type].load) {
      throw new Error(`no associated load action for ${type}`);
    }

    return actions[type].load(...args);
  },

  save(type, ...args) {
    if (!actions[type] || !actions[type].save) {
      throw new Error(`no associated save action for ${type}`);
    }

    return actions[type].save(...args);
  },

  remove(type, ...args) {
    if (!actions[type] || !actions[type].remove) {
      throw new Error(`no associated remove action for ${type}`);
    }

    return actions[type].remove(...args);
  }
};

export default store;

// load initial values from localStorage.
// intentionally syncronous in order to prevent
// undesired route redirection.
export function initState() {
  Object.keys(state).forEach((key) => {
    if (!isIs(key) && state[key] instanceof Function) {
      state[key](storage.getSync(key));
    }
  });

  state.isInitialized(true).end(true);

  if (isValidSession()) {
    actions.auth.persist();
  }
}

if (module.hot) {
  module.hot.accept();
}
