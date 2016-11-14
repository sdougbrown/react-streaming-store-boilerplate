import React, { PropTypes } from 'react';

import { routes } from '../routes';

import { FORM_CLASS } from './field.input';
import { Link } from './';
import Alerts from './alerts';
import PasswordField from './field.password';

const PARENT = 'login-';
const PARENT_FORM_CLASS = 'c-login-form';
const ELEMENTS_WRAP_CLASS = FORM_CLASS;
const HEADING_CLASS = 'c-heading';
const SUBTITLE_CLASS = `${PARENT_FORM_CLASS}__subtitle`;
const INPUTS_WRAP_CLASS = 'c-input-group c-input-group--stacked';
const LINK_WRAP_CLASS = `${PARENT_FORM_CLASS}__links`;
const LINK_CLASS = `c-link ${PARENT_FORM_CLASS}__link`;
const BUTTON_CLASS = 'c-button c-button--primary c-button--block';

const AccountReset = (props) => {
  const { values, onSubmit, ...rest } = props;

  return (
    <form className={PARENT_FORM_CLASS} onSubmit={onSubmit}>
      <h2 className={HEADING_CLASS}>{'Reset Password'}</h2>
      <p className={SUBTITLE_CLASS}>
        {'Enter a new password.'}
      </p>
      <Alerts {...rest} />
      <div className={ELEMENTS_WRAP_CLASS}>
        <div className={INPUTS_WRAP_CLASS}>
          <PasswordField
            model={values.password}
            required={true}
            variant={PARENT}
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
          {'Reset Password'}
        </button>
      </div>
      <div className={LINK_WRAP_CLASS}>
        <Link
          to={routes.login}
          className={LINK_CLASS}
        >
          {'Oh, nevermind, I think I remember now...'}
        </Link>
      </div>
    </form>
  );
};

AccountReset.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default AccountReset;
