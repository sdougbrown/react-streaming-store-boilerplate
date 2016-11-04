import stream from 'flyd-run';
import request from '../utils/request';
import { isDefined } from '../utils/is';

const content = {};

const API_URL = '/api/content';

// example content request w/ cache
export function load({ name, locale = 'en' }) {
  const requestUrl = `${API_URL}?document=${name}&locale=${locale}`;
  const storeKey = `${name}_${locale}`;

  return get(requestUrl, storeKey);
}

function cache(name, obj) {
  if (!name) {
    throw new Error('no content identifier provided');
  }

  if (!isDefined(obj)) {
    content[name] = obj;
  }

  return content[name];
}

function get(url, key) {
  const stored = cache(key);

  if (stored) {
    return stream(stored);
  }

  const req = request(url);

  req.run((schema) => {
    cache(key, schema);
  });

  req.catch(() => {
    // halt execution
    // - prevents infinite loops with invalid values
    return cache(key, null);
  });

  return req;
}

