// Client Routes
//
// ideally here you would split resources on a per-page level.
// also, there's no need to use `react-router`, you could easily
// drop-in any other client-side router of your choice.

import React from 'react';
import { Router, Route } from 'react-router';
import RoutesMap from '../common/routes';
import { appHistory } from './config';

import index from './pages/index';
import account from './pages/account';
import login from './pages/login';
import register from './pages/register';
import reset from './pages/reset-password';
import view from './pages/view';

const pages = {
  index,
  admin,
  account,
  view,
  login,
  register,
  reset,
};

export function mapRoutes() {
  const routeMap = RoutesMap.map();

  return Object.keys(routeMap).map((route) => {
    const key = routeMap[route];

    return (
      <Route
        key={route}
        path={route}
        component={pages[key]}
        onEnter={pages[key].onEnter}
        onChange={pages[key].onChange}
      />
    );
  });
}

const Routes = () => {
  return (
    <Router history={appHistory}>
      {mapRoutes()}
    </Router>
  );
};

export const routes = RoutesMap.routes;

export const setRoute = (url, ops, change = appHistory.push) => {
  change({ pathname: url, query: ops });
};

export default Routes;
