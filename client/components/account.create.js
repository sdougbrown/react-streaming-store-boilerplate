import React, { PropTypes } from 'react';

import { routes } from '../routes';
import * as passwordUtils from '../utils/password';

import { FORM_CLASS } from './field.input';
import { Link } from './';
import Alerts from './alerts';
import { EmailField, EmailHint } from './field.email';
import { PasswordField, PasswordHint } from './field.password';

const PARENT = 'login-';
const PARENT_FORM_CLASS = 'c-login-form';
const ELEMENTS_WRAP_CLASS = FORM_CLASS;
const INPUTS_WRAP_CLASS = 'c-field-group';
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
          <EmailField model={values.email} />
          <EmailHint variant={PARENT} />
          <PasswordField
            model={values.password}
            pattern={passwordUtils.pattern}
            title={passwordUtils.title}
            required={true}
          />
          <PasswordHint variant={PARENT} />
          <PasswordField
            model={values.passwordConfirm}
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <PasswordHint
            variant={PARENT}
            name="confirmPassword"
            hint="Confirm your password"
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