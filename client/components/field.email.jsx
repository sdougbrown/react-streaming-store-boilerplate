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

export const EmailField = Stream((props) => {
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
      type="email"
      name={name || 'email'}
      placeholder={placeholder || 'Email address'}
    />
  );
});

EmailField.propTypes = inputProps;

export const EmailHint = (props) => {
  return (
    <Hint
      variant={props.variant}
      htmlFor={props.name || 'email'}
      icon="edit"
      hint={props.hint || 'Your email address'}
    />
  );
};

EmailHint.propTypes = hintProps;

export default FieldWrapFactory(EmailField, EmailHint);
