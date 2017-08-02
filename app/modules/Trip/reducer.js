// @flow
import type { ActionType } from './actions';
import type { StateType } from './types';
import { ADD_MARKER, CREATE_TRIP, SET_ACTIVE_TRIP } from './actions';

const initialState = {
  activeTripId: null,
  tripHistory: {},
};

const history = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_MARKER:
      return {
        ...state,
        tripHistory: {
          ...state.tripHistory,
          [action.tripId]: state.tripHistory[action.tripId].concat([action.position]),
        },
      };
    case CREATE_TRIP:
      return {
        ...state,
        tripHistory: {
          ...state.tripHistory,
          [action.tripId]: [action.startPosition],
        },
      };
    case SET_ACTIVE_TRIP:
      return {
        ...state,
        activeTripId: action.tripId,
      };
    default:
      return state;
  }
};

export default history;
