import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";

const AddTransactionView = () => {

    const [type, setType] = useState("")
    const [category, setCategory] = useState("")

    return (
        <View style={{flex: 1, padding: 10, paddingBottom: 25}}>
            <View style={{
                paddingHorizontal: 8, 
                paddingBottom: 10, 
                backgroundColor: Colors.DARK, 
                borderRadius: 8
            }}>
                <TextInput
                    style={{width: '100%', backgroundColor: Colors.DARK}}
                    placeholder="Label"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    mode='flat'
                />
                <TextInput
                    style={{width: '100%', backgroundColor: Colors.DARK, marginVertical: 10}}
                    placeholder="Amount"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    mode='flat'
                    keyboardType="numeric"
                />
                <TextInput
                    style={{width: '100%', backgroundColor: Colors.DARK}}
                    placeholder="Note (Optional)"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    mode='flat'
                />
            </View>
            <View style={{height: 20}} />
            <Picker
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor={Colors.DARK_GRAY}
                selectedValue={type}
                onValueChange={(val) => setType(val)}
            >
                <Picker.Item label="Select Type" value="type" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                <Picker.Item label="Income" value="income" style={styles.pickerItem}/>
                <Picker.Item label="Expense" value="expense" style={styles.pickerItem}/>
            </Picker>
            {type == "expense" ? (
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    dropdownIconColor={Colors.DARK_GRAY}
                    selectedValue={category}
                    onValueChange={(val) => setCategory(val)}
                >
                    <Picker.Item label="Select Category" value="category" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                    <Picker.Item label="Bills" value="bills" style={styles.pickerItem}/>
                    <Picker.Item label="Clothing" value="clothing" style={styles.pickerItem}/>
                    <Picker.Item label="Entertainment" value="entertainment" style={styles.pickerItem}/>
                    <Picker.Item label="Food and Drinks" value="food" style={styles.pickerItem}/>
                    <Picker.Item label="Purchases" value="purchases" style={styles.pickerItem}/>
                    <Picker.Item label="Subscriptions" value="subscriptions" style={styles.pickerItem}/>
                    <Picker.Item label="Transportation" value="transportation" style={styles.pickerItem}/>
                    <Picker.Item label="Miscellaneous" value="miscellaneous" style={styles.pickerItem}/>
                </Picker>
            ) : null}
            <TouchableOpacity
                style={styles.btnSave}
                onPress={() => requestAnimationFrame(() => {
                    console.log('save')
                })}
            >
                <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddTransactionView

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        borderWidth: 1,
        backgroundColor: Colors.DARK
    },
    pickerItem: {
        backgroundColor: Colors.DARK, 
        color: 'white'
    },
    btnSave: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.BLUE,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        flexDirection: 'row'
    }
})