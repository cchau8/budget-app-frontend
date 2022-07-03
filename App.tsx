import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./src/containers/HomeScreen";
import LoginScreen from "./src/containers/LoginScreen";
import RegisterScreen from "./src/containers/RegisterScreen";
import ProfileScreen from "./src/containers/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });

    const [userToken, setUserToken] = useState("");

    const setToken = async (token: string) => {
        if (token) {
            await AsyncStorage.setItem("token", token);
        } else {
            await AsyncStorage.removeItem("token");
        }
        setUserToken(token);
    };

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    } else {
        return (
            <NavigationContainer>
                {!userToken ? (
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            animation: "fade_from_bottom",
                        }}
                    >
                        <Stack.Screen name="Login">
                            {() => <LoginScreen setToken={setToken} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register">
                            {() => <RegisterScreen setToken={setToken} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                ) : (
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        );
    }
}
