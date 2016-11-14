import React, { PropTypes } from 'react';

import { routes } from '../routes';

import { FORM_CLASS } from './field.input';
import { Link } from './';
import Alerts from './alerts';
import EmailField from './field.email';
import PasswordField from './field.password';

const PARENT = 'login-';
const PARENT_FORM_CLASS = 'c-login-form';
const ELEMENTS_WRAP_CLASS = FORM_CLASS;
const INPUTS_WRAP_CLASS = 'c-input-group c-input-group--stacked';
const LINK_WRAP_CLASS = `${PARENT_FORM_CLASS}__links`;
const LINK_CLASS = `c-link ${PARENT_FORM_CLASS}__link`;
const BUTTON_CLASS = 'c-button c-button--primary c-button--block';

const AccountCreate = (props) => {
  const { values, onSubmit, ...rest } = props;

  return (
    <form className={PARENT_FORM_CLASS} onSubmit={onSubmit}>
      <h2>{'Create Account'}</h2>
      <Alerts {...rest} />
      <div className={ELEMENTS_WRAP_CLASS}>
        <div className={INPUTS_WRAP_CLASS}>
          <EmailField model={values.email} variant={PARENT} />
          <PasswordField
            model={values.password}
            variant={PARENT}
            required={true}
          />
          <PasswordField
            model={values.passwordConfirm}
            placeholder="Confirm Password"
            name="confirmPassword"
            hint="Confirm your password"
            variant={PARENT}
          />
        </div>
      </div>
      <div className={ELEMENTS_WRAP_CLASS}>
        <button type="submit" className={BUTTON_CLASS}>
          {'Create Account'}
        </button>
      </div>
      <div className={LINK_WRAP_CLASS}>
        <Link
          to={routes.login}
          className={LINK_CLASS}
        >
          {'Oops, I already have an account'}
        </Link>
      </div>
    </form>
  );
};

AccountCreate.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default AccountCreate;
