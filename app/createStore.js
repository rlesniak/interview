// @flow

import { createStore } from 'redux';

import tripReducer from './modules/Trip/reducer';

const configureStore = () => {
  const store = createStore(tripReducer);

  return store;
};

export default configureStore;
