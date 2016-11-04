import React, { PropTypes } from 'react';
import Nav from '../components/nav';

const Layout = (props) => {
  return (
    <div className="c-text">
      <Nav />,
      <div className="c-bg--alt o-panel o-panel--nav-top">
        {props.children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
