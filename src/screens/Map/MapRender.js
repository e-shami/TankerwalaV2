import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

const MapRender = () => {
  const [markers, setMarkers] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const result = await Geolocation.requestAuthorization('whenInUse');
        if (result === 'granted') {
          getCurrentLocation();
        } else {
          console.warn('Location permission denied');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const newInitialRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          setInitialRegion(newInitialRegion);

          // Make an API request to your server (replace with your server endpoint)
          axios.get('AIzaSyC7abWAbj91AdJ3J07vxJrPoaPHD79UuVI')
            .then(response => {
              setMarkers(response.data.markers);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },
        error => {
          console.error('Error getting current location:', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={initialRegion}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

export default MapRender;
