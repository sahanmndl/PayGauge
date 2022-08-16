import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import HomeView from "../views/nav/HomeView";
import Colors from "../constants/Colors";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartsView from "../views/nav/ChartsView";
import ProfileView from "../views/nav/ProfileView";

const BottomTabs = createMaterialBottomTabNavigator()

function BottomNavigator() {
    return (
        <BottomTabs.Navigator
            initialRouteName="HomeView"
            activeColor={Colors.BLUE}
            inactiveColor={Colors.DARK_GRAY}
            barStyle={{ backgroundColor: 'black' }}
            labeled={false}
            shifting={false}
        >
            <BottomTabs.Screen
                name="HomeView"
                component={HomeView}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={26} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="ChartsView"
                component={ChartsView}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chart-box" color={color} size={26} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="ProfileView"
                component={ProfileView}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    )
                }}
            />
        </BottomTabs.Navigator>
    )
}

export default BottomNavigator