// @flow
import type { PositionType } from './types';

type AddMarkerAction = {
  type: 'ADD_MARKER',
  position: PositionType,
  tripId: string,
}

type CreateTripAction = {
  type: 'CREATE_TRIP',
  tripId: string,
  startPosition: PositionType,
}

type SetActiveTripAction = {
  type: 'SET_ACTIVE_TRIP',
  tripId: ?string,
}

export const ADD_MARKER = 'ADD_MARKER';
export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_ACTIVE_TRIP = 'SET_ACTIVE_TRIP';

export const addMarker = (position: PositionType, tripId: string): AddMarkerAction => ({
  type: ADD_MARKER,
  position,
  tripId,
});

export const createTrip = (tripId: string, startPosition: PositionType): CreateTripAction => ({
  type: CREATE_TRIP,
  startPosition,
  tripId
});

export const setActiveTrip = (tripId: ?string): SetActiveTripAction => ({
  type: SET_ACTIVE_TRIP,
  tripId
});

export type ActionType =
  | AddMarkerAction
  | CreateTripAction
  | SetActiveTripAction;
