import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePassowrdPage from "./screens/ChangePassowrdPage";
import ContentPrivacyPage from "./screens/ContentPrivacyPage";
import ForgottenPasswordPage from "./screens/ForgottnePasswordPage";
import InscriptionPage from "./screens/InscriptionPage";
import LoginPage from "./screens/LoginPage";
import ProfilePage from "./screens/ProfilePage";
import MapPage from "./screens/MapPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer fallback={ProfilePage}>
      <Stack.Navigator>
        <Stack.Screen name="ChangePassword" component={ChangePassowrdPage} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ContentPrivacy" component={ContentPrivacyPage} />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPasswordPage}
        />
        <Stack.Screen name="Inscription" component={InscriptionPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
