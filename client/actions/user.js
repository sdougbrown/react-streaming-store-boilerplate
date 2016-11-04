import store from '../store';
import { clear } from './auth';
import request from '../utils/request';
import reject from '../utils/reject';

const API_URL = '/api/users';

// this handles both creating a new user and updating
// an existing user (i.e. a password reset)
//
// this could (and perhaps should) be split into
// a different store action, or refactored to execute
// different functions depending on the presence of
// `reqData.replace`
export function save(values, onError, reqData = {}) {
  const data = store.get('token');
  const token = reqData.token || data.id;
  const userId = reqData.userId || data.userId;

  const url = (reqData.replace && userId)
    ? `${API_URL}/${userId}/replace`
    : API_URL;

  const body = Object.assign({}, store.get('user'), values, {
    username: values.email,
    id: (reqData.replace) ? null : userId,
  });

  const req = request(url, {
    method: 'POST',
    token,
    body
  });

  req.error.run(reject({ onError }));

  return req;
}

export function load(onError, reqData) {
  if (store.get('user')) {
    return store.state.user;
  }

  const data = reqData || store.get('token');

  if (!data) {
    throw new Error('no data for user load request');
  }

  const token = getToken(data, reqData);
  const url = `${API_URL}/${data.userId}`;

  const req = request(url, {
    method: 'GET',
    token,
  });

  req.error.run(reject({ onError, onRejection: clear }));

  req.run((user) => {
    return store.set('user', user);
  });

  return req;
}

function getToken(data = {}, reqData = {}) {
  return reqData.token || data.id;
}


