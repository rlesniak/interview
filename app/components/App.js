// @flow

import React from 'react';

import Map from './Map';

const App = () => {
  const center = { lat: -25.363, lng: 131.044 };

  return (
    <div>
      <h2 id="heading">Hello ReactJS</h2>
      <Map center={center} />
    </div>
  );
};

export default App;
