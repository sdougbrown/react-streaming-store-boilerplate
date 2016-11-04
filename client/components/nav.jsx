import React from 'react';
import { routes } from '../routes';

import { Link } from './';
import Icon from './icons';

/* eslint-disable */
const NAV_CLASS = 'c-nav c-nav--fixed c-nav--top c-nav--high c-nav--inline';
const NAV_ITEM_CLASS = 'c-nav__item c-nav__item--right';
const NAV_ICON_CLASS = 'c-nav__icon';
const LOGO_CLASS = 'c-nav__item c-text--loud c-text--brand';
const LOGO_ICON_CLASS = 'c-logo c-logo--icon c-logo--nav';
/* eslint-enable */

const Nav = () => {
  return (
    <nav className={NAV_CLASS}>
      <div className="o-cw">
        <Link to={routes.index} className={LOGO_CLASS}>
          Streaming Store Example App
        </Link>
        <Link to={routes.account} className={NAV_ITEM_CLASS}>
          <Icon className={NAV_ICON_CLASS} name="user" /> Account
        </Link>
        <Link to={routes.view[0]} className={NAV_ITEM_CLASS}>
          <Icon className={NAV_ICON_CLASS} name="view" /> Edit
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
