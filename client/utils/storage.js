// Storage API
//
// This allows you to impliment any kind of local storage
// transparently and independently from the actual store instance.
//
// This is just an example of using localStorage,
// but you could just as easily use indexDB or something similar. :)

export function get(key) {
  return new Promise((resolve) => {
    resolve(getSync(key));
  });
}

export function set(key, value) {
  return new Promise((resolve) => {
    resolve(setSync(key, value));
  });
}

export function getSync(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setSync(key, value) {
  return localStorage.setItem(key, JSON.stringify(value) || null);
}

