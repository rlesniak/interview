// @flow

import React, { Component } from 'react';
import { first, last } from 'lodash';

import History from '../History';
import GoogleMapService from '../../services/GoogleMap';

import './Map.scss';

type PropsType = {
  center: { lat: number, lng: number },
}

type StateType = {
  waypointsLength: number,
}

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
    GoogleMapService.createMarker(position);

    this.setState({
      waypointsLength: GoogleMapService.markers().length,
    });
  }

  calcRoute = () => {
    GoogleMapService.drawRouteThroughWaypoints().catch((status) => {
      console.error(status);
    });
  }

  renderWay() {
    if (this.state.waypointsLength >= 2) {
      return (
        <div>
          start: {first(GoogleMapService.markers()).getPosition().toString()}
          end: {last(GoogleMapService.markers()).getPosition().toString()}
        </div>
      );
    }

    return 'Waiting for two points';
  }

  render() {
    return (
      <div className="map">
        {this.renderWay()}
        <div className="map__container" ref={(ref) => { this.mapRef = ref; }} />
        {this.state.waypointsLength >= 2 && <button onClick={this.calcRoute}>Calculate</button>}
        <div className="map__history">
          <History />
        </div>
      </div>
    );
  }
}

export default Map;
