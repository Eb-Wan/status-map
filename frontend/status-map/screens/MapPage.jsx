import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = "waiting..";
  if (errorMsg) {
    text = errorMsg;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={styles.map}
          showsUserLocation
        ></MapView>
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapPage;
