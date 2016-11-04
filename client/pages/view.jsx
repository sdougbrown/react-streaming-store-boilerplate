import React, { PropTypes } from 'react';

import store from '../store';
import { routes, setRoute } from '../routes';

import Layout from '../components/layout';

/* eslint-disable max-len */
const MAIN_CLASS = 'c-view o-cw';
/* eslint-enable max-len */

export const ViewPage = ({ location, params }) => {
  return (<Layout>
    <div className={MAIN_CLASS}>
      Well, this was hardly worth creating an account for...
      {JSON.stringify(location)}
      {JSON.stringify(params)}
    </div>
  </Layout>);
};

const ViewWall = (props) => {
  return (
    <ViewPage
      location={props.location}
      params={props.params}
    />
  );
};

ViewWall.onEnter = (next, replace, resolve) => {
  store.authorize().run((valid) => {
    if (!valid) {
      setRoute(routes.login, {
        message: 'Please log in to view this page',
      }, replace);
    }

    resolve();
  });
};

ViewWall.propTypes = ViewPage.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
};

export default ViewWall;
