import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TransactionItem from "../../components/TransactionItem";
import LottieView from 'lottie-react-native';
import NoResults from "../../components/NoResults";

const HomeView = () => {

    const navigation = useNavigation()
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const fetchTransactions = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true)
            await axios.get(`http://10.2.71.238:8000/api/transaction/user/${userId}`)
                .then((response) => {
                    var json = response.data.transactions.transactions
                    console.log(json)
                    setTransactions([...json])
                })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load projects! Please check your internet connection")
            console.log(e.response)
            return false
        } finally {
            setRefresh(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

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
                {loading ? 
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <LottieView 
                            style={{width: 120, height: 120}}
                            source={require('../../../assets/loading.json')} 
                            autoPlay 
                            loop
                        /> 
                    </View>
                :
                    <FlatList
                        data={transactions}
                        keyExtractor={({_id}) => _id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={NoResults}
                        renderItem={({item}) => (
                            <TransactionItem item={item} />
                        )}
                    />
                }
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