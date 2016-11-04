import React, { PropTypes } from 'react';

import { routes } from '../routes';

import { FORM_CLASS } from './field.input';
import { Link } from './';
import Alerts from './alerts';
import Button from './field.button';
import EmailField from './field.email';
import PasswordField from './field.password';

const PARENT = 'login-';
const PARENT_FORM_CLASS = 'c-login-form';
const ELEMENTS_WRAP_CLASS = FORM_CLASS;
const INPUTS_WRAP_CLASS = 'c-input-group c-input-group--stacked';
const LINK_WRAP_CLASS = `${PARENT_FORM_CLASS}__links`;
const LINK_CLASS = `c-link ${PARENT_FORM_CLASS}__link`;
const BUTTON_CLASS = 'c-button c-button--primary c-button--block';

const AccountLogin = (props) => {
  const { values, onSubmit, isWorking, ...rest } = props;

  return (
    <form className={PARENT_FORM_CLASS} onSubmit={onSubmit}>
      <h2>{'Login'}</h2>
      <Alerts {...rest} />
      <div className={ELEMENTS_WRAP_CLASS}>
        <div className={INPUTS_WRAP_CLASS}>
          <EmailField model={values.email} variant={PARENT} />
          <PasswordField model={values.password} variant={PARENT} />
        </div>
      </div>
      <div className={ELEMENTS_WRAP_CLASS}>
        <Button
          type="submit"
          className={BUTTON_CLASS}
          isDisabled={isWorking}
        >
          {'Login'}
        </Button>
      </div>
      <div className={LINK_WRAP_CLASS}>
        <Link
          to={routes.reset}
          className={LINK_CLASS}
        >
          {'Forgot Password'}
        </Link>
        {' | '}
        <Link
          to={routes.register}
          className={LINK_CLASS}
        >
          {'Create Account'}
        </Link>
      </div>
    </form>
  );
};

AccountLogin.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  isWorking: PropTypes.func,
};

export default AccountLogin;
