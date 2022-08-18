import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import Colors from "../constants/Colors";

const NoResults = () => {
    return (
        <View style={styles.container}>
            <LottieView 
                style={{width: 120, height: 120}}
                source={require('../../assets/no-items.json')} 
                autoPlay
                loop={false}
            />
            <Text style={styles.caption}>No Transactions Found!</Text>
        </View>
    )
}

export default NoResults

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    caption: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.DARK_GRAY
    }
})