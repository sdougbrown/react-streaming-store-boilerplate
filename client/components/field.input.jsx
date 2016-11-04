import React, { PropTypes } from 'react';
import bindValue from '../utils/bindValueTo';

import Stream from './';
import Icon from './icons';

export const FORM_CLASS = 'c-form-element';
export const INPUT_CLASS = 'c-field';

export const InputField = Stream((props) => {
  const {
    type,
    model,
    ...rest
  } = props;

  return (
    <input
      {...rest}
      className={INPUT_CLASS}
      value={model()}
      onChange={bindValue(model)}
      type={type || 'text'}
    />
  );
});

export const inputProps = InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  model: PropTypes.func.isRequired,
};

export const Hint = (props) => {
  const variant = props.variant || '';

  return (
    <label
      className={`c-${variant}form__hint c-hint a-hint`}
      htmlFor={props.htmlFor}
    >
      {props.icon && <Icon name={props.icon} className="c-hint__icon" />}
      {props.children}
      {props.hint}
    </label>
  );
};

export const hintProps = Hint.propTypes = {
  variant: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default InputField;
