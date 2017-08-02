// @flow
import type { ActionType } from './actions';
import { ADD_MARKER } from './actions';

const initialState = {};

const history = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_MARKER:
      return state;
    default:
      return state;
  }
};

export default history;
