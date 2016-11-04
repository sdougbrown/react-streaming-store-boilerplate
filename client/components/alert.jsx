import React, { PropTypes } from 'react';
import { isObject } from '../utils/is';
import Stream from './';
import Icon from './icons';

const ALERT_CLASS = 'c-alert';
const CLEAR_BUTTON_CLASS = 'c-button c-button--close';

const ClearAlert = (props) => {
  const prop = props.prop;

  return (
    <button
      className={CLEAR_BUTTON_CLASS}
      onClick={onClearClick(prop)}
    >
      {'×'}
    </button>
  );
};

ClearAlert.propTypes = {
  prop: PropTypes.func,
};

export const Alert = Stream(({ prop, canClear, TYPE }) => {
  if (!prop) {
    return null;
  }

  const contents = prop();
  const isCompound = isObject(contents);
  const isVisibleClass = (contents) ? '' : 'u-ignore';
  const canClearClass = (canClear)
    ? `${ALERT_CLASS}--clearable`
    : '';
  const className = `${ALERT_CLASS} ${ALERT_CLASS}--${TYPE} ${isVisibleClass} ${canClearClass}`; // eslint-disable-line max-len

  return (
    <div className={className}>
      {isCompound ? <AlertContent {...contents} /> : contents}
      {(canClear) ? <ClearAlert prop={prop} /> : null}
    </div>
  );
});

Alert.propTypes = {
  prop: PropTypes.func,
  canClear: PropTypes.bool,
  TYPE: PropTypes.string.isRequired,
};

function AlertContent({ icon, message }) {
  return (
    <span>
      {icon && <Icon name={icon} className="c-alert__icon" /> }
      {message}
    </span>
  );
}

AlertContent.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
};

function onClearClick(prop) {
  return (e) => {
    e.preventDefault();
    // clear prop value
    prop('');
  };
}

export default Alert;
