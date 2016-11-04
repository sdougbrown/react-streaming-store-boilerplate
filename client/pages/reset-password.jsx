import React, { Component, PropTypes } from 'react';
import stream from 'flyd-run';

import store from '../store';
import { reset } from '../actions/auth';
import { routes, setRoute } from '../routes';

import Reset from '../components/account.reset';
import Request from '../components/account.reset.request';
import Layout from '../components/layout';

export class ResetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: stream(),
      success: stream(),
      error: stream(),
      user: stream(),

      values: {
        email: stream(''),
        password: stream(''),
        passwordConfirm: stream(''),
      },
    };
  }

  componentWillMount() {
    const state = this.state;
    const query = this.props.location.query || {};

    state.message(query.message);
    state.success(query.success);
    state.error(query.error);

    state.values.email(query.email || '');

    if (showReset(query)) {
      // logged-in and coming from an email link...
      if (store.isValidSession() && hasRequiredResetAttrs(query)) {
        // clear the current session, then load...
        store.authorize(null).run(() => loadUser({ state, query }));
      } else {
        loadUser({ state, query });
      }
    }
  }

  render() {
    const state = this.state;
    const query = this.props.location.query || {};

    // Reset Page - Either Logged-in, or Linked from Email w/ creds
    // Request Page - No Token or Email Present
    return (<Layout>
      {(showReset(query)) ?
        <Reset
          message={state.message}
          success={state.success}
          error={state.error}
          values={state.values}
          onSubmit={onSubmit(this, onResetSubmit)}
        />
        :
        <Request
          message={state.message}
          success={state.success}
          error={state.error}
          values={state.values}
          onSubmit={onSubmit(this, onRequestSubmit)}
        />
      }
    </Layout>);
  }
}

ResetPage.propTypes = {
  location: PropTypes.object,
};

function hasRequiredResetAttrs(attrs) {
  return Boolean(attrs.userId && attrs.access_token);
}

function showReset(attrs) {
  return store.isValidSession() || hasRequiredResetAttrs(attrs);
}

function loadUser({ state, query }) {
  if (store.isValidSession()) {
    store.state.user.map(state.user);
  } else {
    const req = store.load('user', state.error, {
      token: query.access_token,
      userId: query.userId,
    });

    req.run(state.user);

    req.error.run((errors) => {
      if (errors) {
        // reload the current route, drop the existing token
        setRoute(routes.reset, {
          error: state.error(),
        });
      }
    });
  }
}

function onSubmit(vnode, resolve) {
  return (e) => {
    e.preventDefault();
    resolve(vnode.state, vnode);
  };
}

function onResetSuccess(values, onError) {
  return () => {
    store.authorize(values, onError).run((token) => {
      if (token) {
        setRoute(routes.account, {
          success: 'Password reset successfully'
        });
      }
    });
  };
}

function onResetSubmit({ values, user, error }, { props }) {
  const password = values.password();

  if (!password || !values.passwordConfirm()) {
    return error('Try putting something in the fields');
  }

  if (password !== values.passwordConfirm()) {
    return error('Those passwords do not match');
  }

  const query = props.location.query || {};
  const userData = user() || {};
  const authVals = {
    email: userData.email,
    password,
  };

  return store.save('user', authVals, error, {
    token: query.access_token,
    userId: query.userId,
    replace: true,
  }).run(onResetSuccess(authVals, error));
}

function onRequestSubmit({ values, success, error }) {
  if (!values.email()) {
    return error('Try putting in your email address');
  }

  return reset({
    email: values.email(),
  }, error).run((response) => {
    success(response.message);
  });
}

export default ResetPage;

