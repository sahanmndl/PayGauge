import {useIsFocused} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import {Picker} from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_LINKS from "../../utils/API_LINKS";
import LottieView from 'lottie-react-native';
import NoResults from "../../components/NoResults";
import TransactionItem from "../../components/TransactionItem";

const TransactionsView = () => {

    const isFocused = useIsFocused()
    const [transactions, setTransactions] = useState([])
    const [typeFilter, setTypeFilter] = useState()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const fetchTransactions = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true)
            await axios.get(`${API_LINKS.TRANSACTION}/user/${userId}`)
                .then((response) => {
                    var json = response.data.transactions.transactions
                    setTransactions([...json.reverse()])
                })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load transactions! Please check your internet connection")
            return false
        } finally {
            setRefresh(false)
            setLoading(false)
        }
    }

    const onRefresh = () => {
        setRefresh(true)
        fetchTransactions()
    }

    useEffect(() => {
        isFocused && fetchTransactions()
    }, [isFocused])

    return (
        <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <View style={{flex: 0.075, justifyContent: 'center', paddingHorizontal: 10}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '700'}}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                >
                    Transactions
                </Text>
            </View>
            <View style={{height: 15}}/>
            <View style={{paddingHorizontal: 10}}>
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    dropdownIconColor={Colors.DARK_GRAY}
                    selectedValue={typeFilter}
                    onValueChange={(val) => setTypeFilter(val)}
                >
                    <Picker.Item label="All" value="all" color={'white'} style={styles.pickerItem}/>
                    <Picker.Item label="Income" value="income" color={'white'} style={styles.pickerItem}/>
                    <Picker.Item label="Expense" value="expense" color={'white'} style={styles.pickerItem}/>
                </Picker>
            </View>
            <View style={{height: 20}}/>
            <View style={{flex: 0.9, paddingHorizontal: 10}}>
                {loading ?
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <LottieView
                            style={{width: 100, height: 100}}
                            source={require('../../../assets/loading.json')}
                            autoPlay
                            loop
                        />
                    </View>
                    :
                    <FlatList
                        data={typeFilter == 'income' ? transactions.filter(it => it.type == "income") :
                            typeFilter == 'expense' ? transactions.filter(it => it.type == "expense") :
                                transactions}
                        keyExtractor={({_id}) => _id}
                        refreshing={refresh}
                        onRefresh={onRefresh}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={NoResults}
                        initialNumToRender={20}
                        removeClippedSubviews={false}
                        renderItem={({item}) => (
                            <TransactionItem item={item}/>
                        )}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default TransactionsView

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: Colors.DARK,
        borderRadius: 8
    },
    pickerItem: {
        backgroundColor: Colors.DARK,
        color: 'white',
    },
})