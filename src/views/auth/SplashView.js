import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';
import Colors from "../../constants/Colors";
import AntDesign from "react-native-vector-icons/AntDesign";

const SplashView = () => {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.75, alignItems: 'center', justifyContent: 'center'}}>
                <LottieView 
                    style={{width: 300, height: 300}}
                    source={require('../../../assets/flying-wallet-money.json')} 
                    autoPlay 
                    loop
                />
            </View>
            <View style={{flex: 0.25, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: '700'}}>PayGauge</Text>
                <TouchableOpacity
                    style={styles.btnStarted}
                    onPress={() => requestAnimationFrame(() => {
                        navigation.navigate("RegisterView")
                    })}
                >
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'white', marginRight: 8}}>
                        Get Started
                    </Text>
                    <AntDesign name="arrowright" color={'white'} size={17} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SplashView

const styles = StyleSheet.create({
    btnStarted: {
        height: 55,
        width: '90%',
        backgroundColor: Colors.BLUE,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        flexDirection: 'row'
    }
})