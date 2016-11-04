import React, { PropTypes } from 'react';
import Flyd, { StreamingComponent } from 'react-flyd-component';
import { Link as RouterLink } from 'react-router';
import Icon from './icons';

const BUTTON_CLASS = 'c-button';
const BUTTON_ICON_CLASS = `${BUTTON_CLASS}__icon-left`;

export default Flyd;

export const Link = RouterLink;

export const Component = StreamingComponent;

export const P = Flyd((props) => {
  return <p className={props.className}>{props.children}</p>;
});

export const ButtonIcon = (props) => {
  return ((props.icon)
    ? <Icon className={BUTTON_ICON_CLASS} name={props.icon} />
    : <span className={BUTTON_ICON_CLASS}>
        {props.children}
      </span>
  );
};

ButtonIcon.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
};

