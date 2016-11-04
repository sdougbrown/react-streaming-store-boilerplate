import stream from 'flyd-run';
import { accessToken } from './auth';
import buildQueryString from './querystring.build';

const POST_HEADERS = {
  'Content-Type': 'application/json'
};

/**
 * request
 *
 * A wrapper around the `fetch` api.
 *
 * Fetch is pretty good, but we often need an even simpler API
 * when making requests from the client.
 *
 * `request` assumes that you're making a request for JSON data,
 * and handles some of the heavy lifting involved in dealing with
 * dynamic GET urls and serializing POST requests.
 *
 * It will also auto-authorize your requests, which is nice.
 *
 * request returns a stream so that locally cached data
 * and remote data can be interacted with in exactly the same way.
 *
 * @param {string} url
 * @param {Object} ops
 * @param {Object} ops.method - HTTP method
 * @param {Object} ops.data - GET parameters (parsed)
 * @param {Object} ops.body - POST body (optionally serialized)
 * @param {Boolean|string} ops.token - 'true' to auto-append
 *
 * @example
 * request('/api/horses').run((horses) => {
 *   horses.forEach(ride);
 * });
 *
 * request('/api/horses/', {
 *   method: 'POST',
 *   token: true,
 *   body: {
 *     color: 'brown',
 *     strength: 10,
 *     speed: 8,
 *   }
 * }).run((response) => {
 *   alert(response.message);
 * });
 */
export default function request(url, ops = {}) {
  const req = stream();

  fetch(getUrl(url, ops), getOps(ops)).then((response) => {
    if (response.ok) {
      req.error(null);
      return req(read(response));
    }
    return req.error(read(response));
  }).catch((rejection) => {
    return req.error(rejection);
  });

  return req;
}

function getUrl(url, ops) {
  if (isGET(ops)) {
    return assemble(url, ops.data);
  }

  return url;
}

function getOps(ops) {
  const headers = new Headers(POST_HEADERS);
  const extras = {};

  if (!isGET(ops)) {
    const body = ops.body || ops.data;
    extras.body = (body instanceof Object)
      ? JSON.stringify(body)
      : body;
  }

  if (ops.token) {
    // true to get the default, otherwise use supplied
    const token = (ops.token === true) ? accessToken() : ops.token;
    headers.append('Authorization', token);
  }

  return Object.assign({}, ops, extras, { headers });
}

function isGET(ops) {
  return !ops.method || ops.method === 'GET';
}

function isJSON(response) {
  const type = response.headers.get('Content-Type');
  return type.includes('application/json') && type.includes('charset');
}

function read(response) {
  return (isJSON(response))
    ? response.json()
    : response.text();
}

export function assemble(url, data) {
  const qs = buildQueryString(data);
  if (qs !== '') {
    const prefix = (url.includes('?')) ? '&' : '?';
    return `${url}${prefix}${qs}`;
  }
  return url;
}

