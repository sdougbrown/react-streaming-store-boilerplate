import React, { PropTypes } from 'react';

import Alert from './alert';

const ALERT_WRAP_CLASS = 'c-alerts a-alerts';

export const Alerts = ({ message, success, error, canClear = {} }) => {
  return (
    <div className={ALERT_WRAP_CLASS}>
      <Alert
        prop={error}
        canClear={canClear.error}
        TYPE="error"
      />
      <Alert
        prop={success}
        canClear={canClear.success}
        TYPE="success"
      />
      <Alert
        prop={message}
        canClear={canClear.message}
        TYPE="secondary"
      />
    </div>
  );
};

export const alertProps = Alerts.propTypes = {
  message: PropTypes.func,
  success: PropTypes.func,
  error: PropTypes.func,
  canClear: PropTypes.object,
};


export default Alerts;
