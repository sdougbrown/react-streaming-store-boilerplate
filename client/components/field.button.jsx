import React, { PropTypes } from 'react';

import Stream from './';

export const Button = Stream((props) => {
  const { isDisabled, children, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={isDisabled() ? true : null}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  isDisabled: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
