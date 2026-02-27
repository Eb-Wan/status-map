import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SafeAreaProvider from "react-native-safe-area-context";

import ProfilePage from "./screens/ProfilePage";
import ChangePasswordPage from "./screens/ChangePasswordPage";
import ChatPage from "./screens/ChatPage.jsx";
import ContentPrivacyPage from "./screens/ContentPrivacyPage.jsx";
import ForgottenPasswordPage from "./screens/ForgottenPasswordPage.jsx";
import InscriptionPage from "./screens/InscriptionPage.jsx";
import LoginPage from "./screens/LoginPage.jsx";
import MapPage from "./screens/MapPage.jsx";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="ContentPrivacy" component={ContentPrivacyPage} />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPasswordPage}
        />
        <Stack.Screen name="Inscription" component={InscriptionPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Map" component={MapPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
