// @flow

type AddMarkerAction = {
  type: 'ADD_MARKER',
  position: Object,
  travelId: string,
}

export const ADD_MARKER = 'ADD_MARKER';

export const addMarker = (pos: Object, travelId: string): AddMarkerAction => ({
  type: ADD_MARKER,
  position: pos,
  travelId,
});

export type ActionType = AddMarkerAction;
