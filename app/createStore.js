// @flow

import { createStore, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import tripReducer from './modules/Trip/reducer';

const configureStore = () => {
  const store = createStore(tripReducer, devToolsEnhancer());

  return store;
};

export default configureStore;
