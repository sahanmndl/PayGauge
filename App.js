import "react-native-gesture-handler";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthNavigator from "./src/routes/AuthNavigator";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import MainNavigator from "./src/routes/MainNavigator";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userId')
      setCurrentUser(user)
    } catch (e) {
      Alert.alert("Error!", e.message)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [currentUser])

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {currentUser ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
