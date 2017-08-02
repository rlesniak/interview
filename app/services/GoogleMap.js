// @flow
import { first, last } from 'lodash';

const GoogleMapService = () => {
  const markers: google.maps.Marker[] = [];
  let googleMap: google.maps.Map = null;
  let directionsService: google.maps.DirectionsService;
  let directionsDisplay: google.maps.DirectionsRenderer;

  /**
   * creates waypoints by removing first and last element of all
   */
  const createWaypoints = (): google.maps.LatLng[] => {
    return markers.slice(1, -1).map(marker => ({
      location: marker.getPosition(),
    }));
  }

  return {
    map: (): google.maps.Map => googleMap,
    markers: (): google.maps.Marker[] => markers,

    init: (mapRef: HTMLElement, center: Object, zoom: number = 9) => {
      googleMap = new google.maps.Map(mapRef, { center, zoom });

      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: googleMap,
      });
    },
    bindClickListener: (callback: (e: google.maps.MouseEvent) => void) => {
      googleMap.addListener('click', callback);
    },
    createMarker: (position: google.maps.LatLng): google.maps.Marker => {
      const marker = new google.maps.Marker({
        map: googleMap,
        position,
      });

      markers.push(marker);

      return marker;
    },
    clearMap: () => {
      directionsDisplay.setMap(null);

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      markers.length = 0;
    },
    drawRouteThroughWaypoints: (): Promise<*> => {
      const request = {
        travelMode: google.maps.TravelMode.DRIVING,
        origin: first(markers).getPosition(),
        destination: last(markers).getPosition(),
        waypoints: createWaypoints(),
      };

      return new Promise((resolve, reject) => {
        directionsService.route(request, (resp: Object, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(resp)
            return resolve();
          }

          return reject(status);
        });
      });
    },
  }
};

export default GoogleMapService();
