// @flow

export type PositionType = {
  lat: number,
  lng: number,
};

export type StateType = {
  activeTripId: string,
  tripHistory: {
    [tripId: string]: PositionType[],
  },
};
