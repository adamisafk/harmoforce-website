import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { DAppProvider, ChainId } from '@usedapp/core';

import App from './App';
import * as serviceWorker from './serviceWorker';

//import './App.css';
import './assets/scss/style.scss';

const history = createBrowserHistory();

const config = {
  readOnlyChainId: ChainId.Harmony,
  supportedChains: [
    ChainId.Harmony
  ],
  readOnlyUrls: {
    [ChainId.Harmony]: 'https://api.s0.t.hmny.io'
  }
}

ReactDOM.render(
  <Router history={history}>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
