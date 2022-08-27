import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Platform } from "react-native";
import Colors from "../constants/Colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import API_LINKS from "../utils/API_LINKS";

const TransactionItem = ({ item }) => {

    const { _id, label, note, amount, type, category, timestamp } = item
    const navigation = useNavigation()

    const iso = new Date(timestamp)
    const ist = iso.toLocaleDateString()

    const deleteTransaction = async () => {
        await axios.delete(`${API_LINKS.TRANSACTION}/${_id}`)
            .then(() => 
                Platform.OS == 'android' ? ToastAndroid.show('Transaction deleted!', ToastAndroid.LONG, ToastAndroid.BOTTOM)
                : Platform.OS == 'ios' ? Alert.alert('Success!', 'Transaction deleted') : null)
            .catch(() => Alert.alert('Error!', 'Cannot delete transaction'))
    }

    const deleteAlert = () => {
        Alert.alert(
            "Confirmation", "Do you want to delete this transaction?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log("Cancel"),
                    style: "cancel",
                },
                {
                    text: 'YES',
                    onPress: () => deleteTransaction()
                }
            ],
            {cancelable: true}
        )
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onLongPress={() => deleteAlert()}
            onPress={() => requestAnimationFrame(() => {
                navigation.navigate('UpdateTransactionView', {
                    _id: _id,
                    label: label,
                    note: note,
                    amount: amount,
                    type: type,
                    category: category
                })
            })}
        >
            <View style={{flex: 0.2}}>
                <Image
                    style={{height: 45, width: 45, marginLeft: 4}}
                    source={category === "food" ? require('../../assets/food.png') :
                        category === "transportation" ? require('../../assets/transportation.png') :
                        category === "entertainment" ? require('../../assets/entertainment.png') :
                        category === "clothing" ? require('../../assets/clothing.png') :
                        category === "subscriptions" ? require('../../assets/subscriptions.png') :
                        category === "purchases" ? require('../../assets/purchases.png') :
                        category === "bills" ? require('../../assets/bills.png') :
                        category === "allowance" ? require('../../assets/allowance.png') :
                        category === "comission" ? require('../../assets/commission.png') :
                        category === "gifts" ? require('../../assets/gift.png') :
                        category === "interests" ? require('../../assets/interest.png') :
                        category === "investments" ? require('../../assets/investment.png') :
                        category === "salary" ? require('../../assets/salary.png') :
                        category === "selling" ? require('../../assets/selling.png') :
                        require('../../assets/miscellaneous.png')
                    }
                    defaultSource={require('../../assets/miscellaneous.png')}
                />
            </View>
            <View style={{flex: 0.6}}>
                <Text 
                    style={{color: 'white', fontSize: 18}}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {label}
                </Text>
                <Text 
                    style={{color: Colors.DARK_GRAY, fontSize: 14, marginTop: 6}}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {ist}
                </Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Text 
                    style={{color: type === "income" ? Colors.NIGHT_GREEN : Colors.NIGHT_RED, fontSize: 18}}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    ₹{amount.toString()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default TransactionItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 6,
        backgroundColor: Colors.DARK,
        marginBottom: 16,
        alignItems: 'center',
        elevation: 4,
    }
})