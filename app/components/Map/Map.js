// @flow

import React, { Component } from 'react';
import { first, last } from 'lodash';

import TripHistory from '../TripHistory';
import GoogleMapService from '../../services/GoogleMap';

import type { PositionType } from '../../modules/Trip/types';

import './Map.scss';

type PropsType = {
  center: PositionType,
  onMarkerAdd: (position: PositionType, tripId: ?string) => void,
  onClearMap: () => void,
  activeTripId: ?string,
  trips: Object,
};

type StateType = {
  waypointsLength: number,
};

class Map extends Component {
  state: StateType = {
    waypointsLength: 0,
  }

  componentDidMount() {
    if (this.mapRef instanceof HTMLElement) {
      this.createMap();
      this.bindClickListeners();
    }
  }

  props: PropsType;
  mapRef: ?HTMLElement;

  createMap() {
    GoogleMapService.init(this.mapRef, this.props.center);
  }

  bindClickListeners() {
    GoogleMapService.bindClickListener((e) => {
      this.createMarker(e.latLng);
    });
  }

  createMarker(position: google.maps.LatLng) {
    const plainPosition = { lat: position.lat(), lng: position.lng() };
    GoogleMapService.createMarker(position);

    this.props.onMarkerAdd(plainPosition, this.props.activeTripId)

    this.setState({
      waypointsLength: GoogleMapService.markers().length,
    });
  }

  clearMap = () => {
    GoogleMapService.clearMap();
    this.props.onClearMap();
  }

  calcRoute = () => {
    GoogleMapService.drawRouteThroughWaypoints().catch((status) => {
      console.error(status);
    });
  }

  onTripSelect = (tripId: string) => {
    const points = this.props.trips[tripId];

    this.clearMap();
    points.forEach(point => GoogleMapService.createMarker(new google.maps.LatLng(point)));
  }

  render() {
    return (
      <div className="map">
        <h2>{this.props.activeTripId}</h2>
        <div className="map__container" ref={(ref) => { this.mapRef = ref; }} />
        {this.state.waypointsLength >= 2 && <button onClick={this.calcRoute}>Calculate</button>}
        <button onClick={this.clearMap}>Clear map and create new trip</button>
        <div className="map__history">
          <TripHistory
            activeTripId={this.props.activeTripId}
            trips={this.props.trips}
            handleTripSelect={this.onTripSelect}
          />
        </div>
      </div>
    );
  }
}

export default Map;
