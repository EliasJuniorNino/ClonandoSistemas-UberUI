import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

export default function Directions({
    destination, origin, onReady
}) {
  return (
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyARltgmoCHFP0Z_NucYNG2MCd9_845Cr4Y"
        strokeWidth={3}
        strokeColor="#222"
    />
  ); 
}
