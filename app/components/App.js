// @flow

import React from 'react';

import Map from '../containers/App';

const App = () => {
  const center = { lat: -25.363, lng: 131.044 };

  return (
    <div>
      <Map center={center} />
    </div>
  );
};

export default App;
