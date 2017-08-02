// @flow

import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import Map from '../../components/Map';
import { addMarker, createTrip, setActiveTrip } from '../../modules/Trip/actions';
import { getTrips, getActiveTripId } from '../../modules/Trip/selectors';

import type { StateType, PositionType } from '../../modules/Trip/types';

const mapStateToProps = (state: StateType) => ({
  trips: getTrips(state),
  activeTripId: getActiveTripId(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>, ownProps: Object) => ({
  onClearMap: () => {
    dispatch(setActiveTrip(null));
  },
  onMarkerAdd: (position: PositionType, tripId: ?string) => {
    if (tripId) {
      dispatch(addMarker(position, tripId));
    } else {
      const id = uuid();

      dispatch(createTrip(id, position));
      dispatch(setActiveTrip(id));
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
