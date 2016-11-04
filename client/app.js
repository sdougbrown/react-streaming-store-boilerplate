require('./styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import { initState } from './store';

// initialize store/state
initState();

// blast off!
ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);

