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
import TransactionsView from "../views/nav/TransactionsView";

const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator()

function StackNavigator1() {
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

function StackNavigator2() {
    return (
        <Stack.Navigator initialRouteName="TransactionsView">
            <Stack.Screen
                name="TransactionsView"
                component={TransactionsView}
                options={{headerShown: false}}
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
                name="StackNavigator1"
                component={StackNavigator1}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={26} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="StackNavigator2"
                component={StackNavigator2}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
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