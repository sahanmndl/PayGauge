import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";

const TransactionItem = ({ item }) => {

    const { _id, label, note, amount, type, category, timestamp } = item

    const iso = new Date(timestamp)
    const ist = iso.toLocaleDateString()

    return (
        <TouchableOpacity
            style={styles.container}
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
                <Text style={{color: 'white', fontSize: 18}}>{label}</Text>
                <Text style={{color: Colors.DARK_GRAY, fontSize: 14, marginTop: 6}}>{ist}</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Text style={{color: 'white', fontSize: 18}}>{amount.toString()}</Text>
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