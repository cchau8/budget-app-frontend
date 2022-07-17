import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/containers/LoginScreen";
import RegisterScreen from "./src/containers/RegisterScreen";
import TabNavigator from "./src/containers/TabNavigator";
// REDUX
import { RootState, store } from "./src/store/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const userToken = useSelector((state: RootState) => state.user.token);
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
    });
    return !fontsLoaded ? (
        <View>
            <Text>Loading</Text>
        </View>
    ) : (
        <NavigationContainer>{userToken ? <TabNavigator /> : <AuthStack />}</NavigationContainer>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
            }}
        >
            <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
            <Stack.Screen name="Register">{() => <RegisterScreen />}</Stack.Screen>
        </Stack.Navigator>
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <RootStack />
        </Provider>
    );
}
