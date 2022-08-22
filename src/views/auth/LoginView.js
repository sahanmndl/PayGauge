import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import API_LINKS from "../../utils/API_LINKS";

const LoginView = () => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async () => {
        if(email.trim() == "" || password.trim() == "") {
            Alert.alert('Error!', 'Inputs cannot be empty')
        } else if (password.trim().length < 8) {
            Alert.alert('Error!', 'Password must be atleast 8 characters')
        } else {
            setLoading(true)
            try {
                const response = await axios.post(`${API_LINKS.USER}/login`, {
                    email: email.trim(),
                    password: password.trim()
                })
                const data = await response.data

                await AsyncStorage.setItem('user', JSON.stringify(data.user))
                await AsyncStorage.setItem('userId', data.user._id)

                navigation.reset({
                    index: 0,
                    routes: [{name: 'MainNavigator'}]
                })
                return true
            } catch (err) {
                Alert.alert('Error!', err.response.data.message)
                return false
            } finally {
                setEmail("")
                setPassword("")
                setLoading(false)
            }
        }
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.1, alignItems: 'center'}}>
                <Text style={{fontSize: 28, fontWeight: '700', color: 'white'}}>
                    Welcome back!
                </Text>
            </View>
            <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={styles.textInput}
                    mode='outlined'
                    placeholder="Email"
                    placeholderTextColor={Colors.DARK_GRAY}
                    keyboardType="email-address"
                    outlineColor={Colors.DARK_GRAY}
                    activeOutlineColor={Colors.BLUE}
                    left={<TextInput.Icon name='email' color={Colors.DARK_GRAY} />}
                    theme={{colors: {text: 'white'}}}
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <View style={styles.innerMargin} />
                <TextInput
                    style={styles.textInput}
                    mode='outlined'
                    placeholder="Password"
                    placeholderTextColor={Colors.DARK_GRAY}
                    secureTextEntry
                    maxLength={24}
                    outlineColor={Colors.DARK_GRAY}
                    activeOutlineColor={Colors.BLUE}
                    left={<TextInput.Icon name='lock' color={Colors.DARK_GRAY} />}
                    theme={{colors: {text: 'white'}}}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <TouchableOpacity
                    style={styles.buttonSubmit}
                    disabled={loading ? true : false}
                    onPress={() => login()}
                >
                    {loading ?
                        <ActivityIndicator color={'white'}/>
                        : <Text style={styles.btnText}>Login</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: Colors.DARK_GRAY}}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterView')}>
                    <Text style={{marginStart: 4, color: Colors.BLUE, fontWeight: '500'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginView

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        borderRadius: 4,
        backgroundColor: 'black'
    },
    innerMargin: {
        height: 15
    },
    buttonSubmit: {
        height: 45,
        width: '90%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.BLUE,
        borderRadius: 4,
        elevation: 4,
        marginTop: 30
    },
    btnText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "500"
    }
})