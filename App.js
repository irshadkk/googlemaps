import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';
import {decode} from '@mapbox/polyline';

const CustomMarker = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: '#fff',
      borderColor: '#eee',
      borderRadius: 5,
      elevation: 10,
    }}>
    <Text>Berlin</Text>
  </View>
);

const latLongArr = [
  {
    latitude: 11.49928150705141,
    longitude: 76.02240850629362,
  },
  {
    latitude: 11.483401581802392,
    longitude: 75.99104358461801,
  },
  {
    latitude: 11.473169551061414,
    longitude: 76.02687164870723,
  },
  {
    latitude: 11.519823271555806,
    longitude: 76.05230924118209,
  },
  {
    latitude: 11.531584474146506,
    longitude: 76.02016434118211,
  },
];
const App = () => {
  const [region, setRegion] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const [coords, setCoords] = useState([]);
  const [coords1, setCoords1] = useState([]);
  const [coords2, setCoords2] = useState([]);
  const [coords3, setCoords3] = useState([]);
  const [coords4, setCoords4] = useState([]);

  useEffect(() => {
    getDirections(
      `${latLongArr[0].latitude},${latLongArr[0].longitude}`,
      `${latLongArr[1].latitude},${latLongArr[1].longitude}`,
    )
      .then((coords) => {
        console.log(coords);
        setCoords(coords);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
      });
    getDirections(
      `${latLongArr[1].latitude},${latLongArr[1].longitude}`,
      `${latLongArr[2].latitude},${latLongArr[2].longitude}`,
    )
      .then((coords) => {
        console.log(coords);
        setCoords1(coords);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
      });
    getDirections(
      `${latLongArr[2].latitude},${latLongArr[2].longitude}`,
      `${latLongArr[3].latitude},${latLongArr[3].longitude}`,
    )
      .then((coords) => {
        console.log(coords);
        setCoords2(coords);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
      });
    getDirections(
      `${latLongArr[3].latitude},${latLongArr[3].longitude}`,
      `${latLongArr[4].latitude},${latLongArr[4].longitude}`,
    )
      .then((coords) => {
        console.log(coords);
        setCoords3(coords);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
      });
    getDirections(
      `${latLongArr[4].latitude},${latLongArr[4].longitude}`,
      `${latLongArr[0].latitude},${latLongArr[0].longitude}`,
    )
      .then((coords) => {
        console.log(coords);
        setCoords4(coords);
      })
      .catch((err) => {
        console.log(err);
        console.log('Something went wrong');
      });
  }, []);

  const _map = useRef(null);
  useEffect(() => {}, []);

  const animateToLocation = (lat, long) => {
    if (_map.current) {
      _map.current.animateCamera(
        {
          center: {
            latitude: lat,
            longitude: long,
          },
          zoom: 15,
        },
        5000,
      );
    }
  };

  setTimeout(function () {
    animateToLocation(latLongArr[1].latitude, latLongArr[1].longitude);
  }, 3000);
  setTimeout(function () {
    animateToLocation(latLongArr[2].latitude, latLongArr[2].longitude);
  }, 6000);
  setTimeout(function () {
    animateToLocation(latLongArr[3].latitude, latLongArr[3].longitude);
  }, 9000);
  setTimeout(function () {
    animateToLocation(latLongArr[4].latitude, latLongArr[4].longitude);
  }, 12000);
  setTimeout(function () {
    animateToLocation(latLongArr[0].latitude, latLongArr[0].longitude);
  }, 15000);

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = 'AIzaSyBCXo_u5OGAScq1iN32sSSkVtls1VZubL4';
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`,
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };
  return (
    latLongArr.length && (
      <>
        <MapView
          style={{flex: 1}}
          ref={_map}
          initialRegion={{
            latitude: latLongArr[0].latitude,
            longitude: latLongArr[0].longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}>
          {/* {latLongArr.map((val) => {
            return (
              <Marker
                coordinate={{
                  latitude: val.latitude,
                  longitude: val.longitude,
                }}></Marker>
            );
          })} */}

          <Marker
            coordinate={{
              latitude: latLongArr[0].latitude,
              longitude: latLongArr[0].longitude,
            }}></Marker>
          <Marker
            coordinate={{
              latitude: latLongArr[1].latitude,
              longitude: latLongArr[1].longitude,
            }}></Marker>
          <Marker
            coordinate={{
              latitude: latLongArr[2].latitude,
              longitude: latLongArr[2].longitude,
            }}></Marker>
          <Marker
            coordinate={{
              latitude: latLongArr[3].latitude,
              longitude: latLongArr[3].longitude,
            }}></Marker>
          <Marker
            coordinate={{
              latitude: latLongArr[4].latitude,
              longitude: latLongArr[4].longitude,
            }}></Marker>
          <Polyline coordinates={latLongArr} />
          {coords.length > 0 && (
            <Polyline
              strokeWidth={3}
              strokeColor="#00FF00"
              coordinates={coords}
            />
          )}
          {coords1.length > 0 && (
            <Polyline strokeWidth={3} coordinates={coords1} />
          )}
          {coords2.length > 0 && (
            <Polyline strokeWidth={3} coordinates={coords2} />
          )}
          {coords3.length > 0 && (
            <Polyline strokeWidth={3} coordinates={coords3} />
          )}
          {coords4.length > 0 && (
            <Polyline strokeWidth={3} coordinates={coords4} />
          )}
        </MapView>
      </>
    )
  );
};

export default App;
