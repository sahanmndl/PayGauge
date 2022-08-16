import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileView from "../views/nav/ProfileView";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator()

function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="ProfileView">
            <Stack.Screen
                name="ProfileView"
                component={ProfileView}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator