// @flow

import { connect } from 'react-redux';

import TripHistory from '../../components/TripHistory';
import { getTrips } from '../../modules/Trip/selectors';

import type { StateType } from '../../modules/Trip/types';

const mapStateToProps = (state: StateType) => ({
  trips: getTrips(state),
});

export default connect(mapStateToProps)(TripHistory);
