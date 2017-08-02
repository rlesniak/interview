// @flow

import { get } from 'lodash';

import type { StateType, PositionType } from './types';

export const getTrips = (state: StateType): { [tripId: string ]: PositionType[] } => get(state, 'tripHistory', {});

export const getActiveTripId = (state: StateType): ?string => get(state, 'activeTripId');
