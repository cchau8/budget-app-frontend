import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 20,
                    left: 15,
                    right: 15,
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    height: 80,
                    ...styles.tabBarShadow,
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
