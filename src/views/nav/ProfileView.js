import React, { useState } from "react";
import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileView = () => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        const keys = ['user', 'userId']
        try {
            await AsyncStorage.multiRemove(keys)
            .then(async () => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'AuthNavigator'}]
                })
                return true
            })
        } catch (err) {
            Alert.alert('Error!', '')
            return false
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}

export default ProfileView