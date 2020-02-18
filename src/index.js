import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // for redux dev tools
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
); // setup redux store

ReactDOM.render( // setup the store and pass app in
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);