import React, { PropTypes } from 'react';

import Stream, {
  ButtonIcon as Icon,
  Link as RouterLink
} from './';
import Alerts from './alerts';

const BUTTON_CLASS = 'c-button c-button--secondary';

const AccountCard = Stream((props) => {
  const user = props.user() || {};
  return (
    <div className="c-profile">
      <Alerts {...props} />
      <div className="c-profile__card c-card c-card--high">
        <div className="c-card__content">
          <h1 className="c-heading">
            {'Hello you are logged-in.'}
          </h1>
          <p className="c-paragraph">{user.email}</p>
          <p className="c-paragraph">
            {'More customization coming soon!'}
          </p>
        </div>
      </div>
      <AccountButtons
        user={props.user}
        onLogout={props.onLogout}
        isAdmin={user.isAdmin}
      />
    </div>
  );
});

AccountCard.propTypes = {
  user: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const AccountButtons = Stream((props) => {
  return (
    <div className="c-profile__buttons c-button-group">
      <Link to="/reset-password">
        <Icon icon="password" />{'Reset Password'}
      </Link>
      <Button onClick={props.onLogout}><Icon icon="exit" />{'Logout'}</Button>
    </div>
  );
});

AccountButtons.propTypes = {
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={BUTTON_CLASS}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const Link = (props) => {
  return (
    <RouterLink to={props.to} className={BUTTON_CLASS}>
      {props.children}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};


Icon.propTypes = {
  children: PropTypes.node,
};

export default AccountCard;
