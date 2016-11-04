import React, { Component, PropTypes } from 'react';
import stream from 'flyd-run';

import store from '../store';
import { routes, setRoute } from '../routes';

import Layout from '../components/layout';
import Create from '../components/account.create';

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: stream(),
      error: stream(),
      values: {
        email: stream(''),
        password: stream(''),
        passwordConfirm: stream(''),
      },
    };

    this.onSubmit = onSubmit(this);
  }

  componentDidMount() {
    this.state.message(this.props.location.query.message || '');
    this.state.error('');
  }

  render() {
    return (<Layout>
      <Create
        values={this.state.values}
        message={this.state.message}
        error={this.state.error}
        onSubmit={this.onSubmit}
      />
    </Layout>);
  }
}

RegisterPage.propTypes = {
  location: PropTypes.object,
};

const RegisterWall = (props) => <RegisterPage {...props} />;

RegisterWall.onEnter = (next, replace, resolve) => {
  store.authorize().run((valid) => {
    if (valid) {
      setRoute(routes.account);
    }
    resolve();
  });
};

function onSubmit(vnode) {
  return (e) => {
    e.preventDefault();
    onCreate(vnode.state.values, vnode.state.error);
  };
}

function onCreate(values, error) {
  const email = values.email();
  const password = values.password();

  if (!email || !password || !values.passwordConfirm()) {
    return error('Try putting something in the fields');
  }

  if (password !== values.passwordConfirm()) {
    return error('Those passwords do not match');
  }

  const authVals = {
    email,
    password
  };

  return store.save('user', authVals, error)
    .run(onSuccess(authVals, error));
}

function onSuccess(values, error) {
  return () => {
    store.authorize(values, error).run((token) => {
      if (token) {
        setRoute(routes.account);
      }
    });
  };
}

export default RegisterWall;

