import React, { Component } from 'react';
import { keys } from 'lodash';
import { compose, withHandlers } from 'recompose';

const TripHistory = (props) => {
  return (
    <div>
      {Object.keys(props.trips).map(tripId => {
        const handler = props.handleTripSelect.bind(null, tripId);

        return (
          <div><button onClick={handler}>{tripId}</button></div>
        );
      })}
    </div>
  );
}

export default TripHistory;
