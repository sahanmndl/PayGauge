import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const HomeView = () => {

    const navigation = useNavigation()

    return (
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <View style={{flex: 0.075, justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '700'}}>Hello, Sahan</Text>
            </View>
            <View style={{flex: 0.325, justifyContent: 'center'}}>
                <TouchableOpacity style={{elevation: 8}}>
                    <LinearGradient
                        style={styles.card}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={['#0082c8', '#007AFF', '#007AFF', '#0082c8']}
                    >
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <View>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../../../assets/chip_1.png')}
                                />
                            </View>
                            <View style={{paddingBottom: 10}}>
                                <Text style={{fontSize: 12, color: Colors.WHITISH2, marginBottom: 4}}>MY BALANCE</Text>
                                <Text style={{fontSize: 28, fontWeight: '700', color: 'white'}}>$450000</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.6}}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => requestAnimationFrame(() => {
                        navigation.navigate('AddTransactionView')
                    })}
                >
                    <Feather name='plus' size={26} color='#FFF' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeView

const styles = StyleSheet.create({
    card: {
        height: '95%',
        backgroundColor: 'black',
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 20
    },
    fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 63,
        height: 63,
        position: 'absolute',
        bottom: 40,
        right: 28,
        backgroundColor: Colors.BLUE,
        borderRadius: 100,
        shadowColor: '#FFF',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
})