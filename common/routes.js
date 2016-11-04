const flatMap = require('lodash/flatMap');
const forEach = require('lodash/forEach');

const Routes = {
  index: '/',
  account: '/account',
  login: '/login',
  reset: '/reset-password',
  register: '/register',
  view: [
    '/view',
    '/:thing/view',
    '/:thing/view/:otherthing',
    '/:thing/view/:otherthing/:thirdthing',
  ],
};

function mapList(routes) {
  return flatMap(routes, (route) => {
    if (Array.isArray(route)) {
      return mapList(route);
    }

    return route;
  });
}

function mapByType(routes, key, map = {}) {
  forEach(routes, (route, index) => {
    if (Array.isArray(route)) {
      mapByType(route, index, map);
    } else {
      map[route] = key || index;
    }
  });

  return map;
}

module.exports = {
  // static values
  routes: Routes,

  // methods to derive a format from the values
  list() {
    return mapList(Routes);
  },
  map() {
    return mapByType(Routes);
  },
};
