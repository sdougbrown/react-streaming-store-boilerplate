import React from 'react';
import { routes } from '../routes';

import { Link } from '../components/';
import Icon from '../components/icons';
import Layout from '../components/layout';

/* eslint-disable max-len */
const MAIN_CLASS = 'c-homepage o-cw';
const TITLE_CLASS = 'c-homepage__title';
const SUBTITLE_CLASS = 'c-homepage__subtitle';
const LINK_WRAP_CLASS = 'c-input-group';
const LINK_CLASS = 'c-button c-button--primary';
const LINK_ICON_CLASS = 'c-button__icon-left';
/* eslint-enable max-len */

export const IndexPage = () => {
  return (<Layout>
    <div className={MAIN_CLASS}>
      <h1 className={TITLE_CLASS}>
        {'React Streaming Store Example'}
      </h1>
      <p className={SUBTITLE_CLASS}>
        {'A sane way to structure modern web applications.'}
      </p>
      <div className={LINK_WRAP_CLASS}>
        <Link to={routes.view[0]} className={LINK_CLASS}>
          <Icon className={LINK_ICON_CLASS} name="view" />
          {'View Content'}
        </Link>
        <Link to={routes.account} className={LINK_CLASS}>
          <Icon className={LINK_ICON_CLASS} name="user" />
          {'My Account'}
        </Link>
      </div>
    </div>
  </Layout>);
};

export default IndexPage;
