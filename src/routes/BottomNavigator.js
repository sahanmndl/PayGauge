import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import HomeView from "../views/nav/HomeView";
import Colors from "../constants/Colors";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChartsView from "../views/nav/ChartsView";
import ProfileView from "../views/nav/ProfileView";
import AddTransactionView from "../views/main/AddTransactionView";
import { createStackNavigator } from "@react-navigation/stack";
import UpdateTransactionView from "../views/main/UpdateTransactionView";

const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator()

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="HomeView">
            <Stack.Screen
                name="HomeView"
                component={HomeView}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AddTransactionView"
                component={AddTransactionView}
                options={{
                    headerShown: true, 
                    headerTitle: "Add Transaction",
                    headerStyle: {backgroundColor: 'black' }
                }}
            />
            <Stack.Screen
                name="UpdateTransactionView"
                component={UpdateTransactionView}
                options={{
                    headerShown: true, 
                    headerTitle: "Update Transaction",
                    headerStyle: {backgroundColor: 'black' }
                }}
            />
        </Stack.Navigator>
    )
}

function BottomNavigator() {
    return (
        <BottomTabs.Navigator
            initialRouteName="StackNavigator"
            activeColor={Colors.BLUE}
            inactiveColor={Colors.DARK_GRAY}
            barStyle={{ backgroundColor: 'black' }}
            labeled={false}
            shifting={false}
        >
            <BottomTabs.Screen
                name="StackNavigator"
                component={StackNavigator}
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