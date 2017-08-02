import React, { Component } from 'react';
import { keys } from 'lodash';

const TripHistory = (props) => {
  console.log(props)

  return (
    <div>= {Object.keys(props.trips).map(key => <h1>{key}</h1>)}</div>
  );
}

export default TripHistory;
