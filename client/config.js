import { hashHistory, browserHistory } from 'react-router';
/* eslint-disable */
export const ENV = process.env.BUILD_ENV;
/* eslint-enable */
export const isDev = ENV === 'development';
export const appHistory = (isDev) ? hashHistory : browserHistory;

export default const config = {
  env: ENV,
  isDev,
  history,
};

