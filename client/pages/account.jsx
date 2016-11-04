import React, { Component, PropTypes } from 'react';
import stream from 'flyd-run';

import store from '../store';
import { routes, setRoute } from '../routes';

import Card from '../components/account.card';
import Layout from '../components/layout';

export class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: stream(''),
      error: stream(''),
    };

    this.onLogout = onLogout(this);
  }

  componentWillMount() {
    this.state.success(this.props.location.query.success);
    this.state.error('');

    const req = store.load('user', this.state.error);

    req.error.run((errors) => {
      if (errors) {
        setRoute(routes.login);
      }
    });
  }

  render() {
    const state = this.state;

    return (<Layout>
      <Card
        user={store.state.user}
        success={state.success}
        error={state.error}
        onLogout={this.onLogout}
      />
    </Layout>);
  }
}

AccountPage.propTypes = {
  location: PropTypes.object,
};


const AccountWall = (props) => <AccountPage {...props} />;

AccountWall.onEnter = (next, replace, resolve) => {
  store.authorize().run((valid) => {
    if (!valid) {
      setRoute(routes.login, {
        message: 'Please log in to view this page',
      }, replace);
    }
    resolve();
  });
};

AccountWall.onChange = (prev, next, replace, resolve) => {
  AccountWall.onEnter(next, replace, resolve);
};

function onLogout(vnode) {
  return () => {
    const req = store.authorize(null, vnode.state.error);

    // always redirect
    req.run(redirect);
    req.error.run(redirect);
  };
}

function redirect() {
  setRoute(routes.login, {
    message: 'You have logged-out'
  });
}

export default AccountWall;

