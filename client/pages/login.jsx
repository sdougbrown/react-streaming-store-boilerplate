import React, { PropTypes, Component } from 'react';
import stream from 'flyd-run';

import store from '../store';
import { routes, setRoute } from '../routes';

import Login from '../components/account.login';
import Layout from '../components/layout';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: stream(),
      message: stream(),
      error: stream(),
      values: {
        email: stream(''),
        password: stream('')
      },
      isWorking: stream(false),
    };

    // pre-bind methods
    this.onSubmit = onSubmit(this);

    // clear working state on error
    this.state.error.run(() => {
      this.state.isWorking(false);
    });
  }

  componentDidMount() {
    const query = this.props.location.query;

    this.state.message(query.message || '');
    this.state.success(query.success || '');
    this.state.error('');

    this.state.isWorking(false);
  }

  render() {
    const state = this.state;

    return (<Layout>
      <Login
        values={state.values}
        message={state.message}
        success={state.success}
        error={state.error}
        isWorking={state.isWorking}
        onSubmit={this.onSubmit}
      />
    </Layout>);
  }
}

LoginPage.propTypes = {
  message: PropTypes.string,
  success: PropTypes.string,
  previous: PropTypes.string,
  location: PropTypes.object,
};

const LoginWall = (props) => <LoginPage {...props} />;

LoginWall.onEnter = (next, replace, resolve) => {
  store.authorize().run((valid) => {
    if (valid) {
      replace(routes.account);
    }
    resolve();
  });
};

LoginWall.onChange = (prev, next, replace, resolve) => {
  LoginWall.onEnter(next, replace, resolve);
};

function onSubmit(vnode) {
  return (e) => {
    e.preventDefault();

    vnode.state.isWorking(true);

    onLogin(
      vnode.state.values,
      vnode.state.error,
      vnode.props.location.query.previous
    );
  };
}

function onLogin(values, error, previous) {
  if (!values.email() || !values.password()) {
    return error('Try putting something in the fields');
  }

  return store.authorize({
    email: values.email(),
    password: values.password()
  }, error).run(() => {
    setRoute(previous || routes.account);
  });
}

export default LoginWall;

