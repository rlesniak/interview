// @flow

import { get } from 'lodash';

import type { StateType, PositionType } from './types';

export const getTrips = (state: StateType): PositionType[] => get(state, 'tripHistory', []);
