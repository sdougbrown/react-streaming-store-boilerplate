import React from 'react';
import bindValue from '../utils/bindValueTo';

import Stream from './';

import {
  FieldWrapFactory,
  Hint,
  INPUT_CLASS,
  inputProps,
  hintProps
} from './field.input';

export const PasswordField = Stream((props) => {
  const {
    name,
    model,
    placeholder,
    ...rest
  } = props;

  return (
    <input
      {...rest}
      className={INPUT_CLASS}
      value={model()}
      onChange={bindValue(model)}
      type="password"
      name={name || 'password'}
      placeholder={placeholder || 'Password'}
    />
  );
});

PasswordField.propTypes = inputProps;

export const PasswordHint = (props) => {
  return (
    <Hint
      variant={props.variant}
      htmlFor={props.name || 'password'}
      icon="password"
      hint={props.hint || 'Your password'}
    />
  );
};

PasswordHint.propTypes = hintProps;

export default FieldWrapFactory(PasswordField, PasswordHint);
