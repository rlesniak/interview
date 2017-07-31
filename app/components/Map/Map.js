// @flow

import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';

import History from '../History';

import './Map.scss';

type StateType = {
  isInitialized: boolean,
  waypoints: Object[],
}

class Map extends Component {
  mapRef: ?Element;
  googleMap: google;

  state: StateType = {
    isInitialized: false,
    waypoints: [],
  }

  componentDidMount() {
    if (this.mapRef) {
      this.createMap();
      this.bindClickListeners();
    }
  }

  createMap() {
    const uluru = { lat: -25.363, lng: 131.044 };

    this.googleMap = new google.maps.Map(this.mapRef, { center: uluru, zoom: 9 });
  }

  bindClickListeners() {
    this.googleMap.addListener('click', e => {
      this.createMarker(e.latLng);
    })
  }

  createMarker(position: Object) {
    var marker = new google.maps.Marker({
      position: position,
      map: this.googleMap,
    });

    this.googleMap.panTo(position);

    this.setState({
      waypoints: this.state.waypoints.concat([marker]),
    })
  }

  render() {
    return (
      <div className="map">
        size: {this.state.waypoints.length}
        <div className="map__container" ref={ref => { this.mapRef = ref }} />
        <div className="map__history">
          <History />
        </div>
      </div>
    );
  }
};

export default Map;
