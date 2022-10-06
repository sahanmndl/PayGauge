import React, { useEffect, useState } from "react";
import { Text, StatusBar, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors";
import axios from "axios";
import API_LINKS from "../../utils/API_LINKS";

const ProfileView = () => {

    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const fetchCurrentUser = async () => {
        try {
            await AsyncStorage.getItem('userId')
            .then(async (userId) => {
                await axios.get(`${API_LINKS.USER}/${userId}`)
                .then((response) => setCurrentUser(response.data.user))
                .catch((e) => {
                    Alert.alert('', 'Error!')
                })
            })
            .catch((e) => {
                Alert.alert('', 'Error!')
            })
        } catch (err) {
            Alert.alert('Error!', 'Cannot load profile details')
        } finally {
            setRefresh(false)
        }
    }

    const onRefresh = () => {
        setRefresh(true)
        fetchCurrentUser()
    }

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

    const logoutAlert = () => {
        Alert.alert(
            "Confirmation", "Do you want to logout?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log("Cancel"),
                    style: "cancel",
                },
                {
                    text: 'Yes',
                    onPress: () => logout()
                }
            ],
            {cancelable: true}
        )
    }

    useEffect(() => {
        isFocused && fetchCurrentUser()
    }, [isFocused])

    return (
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <View style={{flex: 0.075, alignItems: 'center', justifyContent: 'space-between', display: 'flex', flexDirection: 'row'}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '700'}}>My Profile</Text>
                <TouchableOpacity
                    disabled={loading ? true : false}
                    onPress={() => logoutAlert()}
                >
                    {loading ?
                        <ActivityIndicator color={'white'}/>
                        : <Text style={styles.btnText}>Logout</Text>
                    }
                </TouchableOpacity>
            </View>
                <View style={{height: 10}} />
                <ScrollView
                    style={{flex: 0.925}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="account" size={24} color={Colors.DARK_GRAY} />
                            <Text style={{fontSize: 17, marginStart: 10, color: 'white'}}>
                                {currentUser ? currentUser.name : 'loading...'}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <MaterialCommunityIcons name="email" size={24} color={Colors.DARK_GRAY} />
                            <Text style={{fontSize: 17, marginStart: 10, color: 'white'}}>
                                {currentUser ? currentUser.email : 'loading...'}
                            </Text>
                        </View>
                    </View>
                    <View style={{height: 15}} />
                    <View style={styles.profileContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="format-list-bulleted" size={24} color={Colors.DARK_GRAY} />
                            <Text style={{fontSize: 17, marginStart: 10, color: 'white'}}>
                                {currentUser ? currentUser.transactions.length.toString() + ' Transactions' : 'loading...'}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
        </View>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: Colors.DARK,
        padding: 10,
        borderRadius: 4,
        elevation: 4
    },
    btnText: {
        alignSelf: "flex-end",
        color: Colors.NIGHT_RED,
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 4
    }
})