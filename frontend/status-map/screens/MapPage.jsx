import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";

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

  let text = "waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else {
    text = JSON.stringify(location);
  }

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default MapPage;
