import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import API_LINKS from "../../utils/API_LINKS";

const UpdateTransactionView = ({ route }) => {

    const { _id, label, note, amount, type, category } = route.params

    const navigation = useNavigation()
    const [labelUpdate, setLabelUpdate] = useState(label)
    const [amountUpdate, setAmountUpdate] = useState(amount.toString())
    const [noteUpdate, setNoteUpdate] = useState(note)
    const [typeUpdate, setTypeUpdate] = useState(type)
    const [categoryUpdate, setCategoryUpdate] = useState(category)
    const [loading, setLoading] = useState(false)

    const updateTransaction = async () => {
        const currentTimestamp = new Date()
        if(labelUpdate.trim() == "" || amountUpdate.trim() == "") {
            Alert.alert("Error!", "Inputs cannot be empty")
        } else if (typeUpdate == "type") {
            Alert.alert("Error!", "Please select your transaction type")
        } else if (categoryUpdate == "category") {
            Alert.alert("Error!", "Please select your transaction category")
        } else {
            setLoading(true)
            try {
                const userId = await AsyncStorage.getItem('userId')

                var updatedAmount = parseFloat(amountUpdate)
                if(typeUpdate == "income") {
                    if(updatedAmount < 0) {
                        updatedAmount = updatedAmount * -1
                    }
                } else if (typeUpdate == "expense") {
                    if(updatedAmount > 0) {
                        updatedAmount = updatedAmount * -1
                    }
                }

                const response = await axios.put(`${API_LINKS.TRANSACTION}/update/${_id}`, {
                    label: labelUpdate.trim(),
                    note: noteUpdate.trim(),
                    amount: Math.round((updatedAmount + Number.EPSILON) * 100) / 100,
                    type: typeUpdate,
                    category: categoryUpdate,
                    timestamp: currentTimestamp.getTime(),
                    user: userId
                })
                const data = await response.data
                navigation.goBack()
                return data
            } catch(e) {
                Alert.alert("Error!", "Unable to update transaction!")
            } finally {
                setLoading(false)
            }
        }
    }

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
                    placeholder="Label*"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    mode='flat'
                    left={<TextInput.Icon name='label-variant' color={Colors.DARK_GRAY} />}
                    maxLength={64}
                    value={labelUpdate}
                    onChangeText={text => setLabelUpdate(text)}
                />
                <TextInput
                    style={{width: '100%', backgroundColor: Colors.DARK, marginVertical: 10}}
                    placeholder="Amount*"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    mode='flat'
                    keyboardType="numeric"
                    left={<TextInput.Icon name='numeric' color={Colors.DARK_GRAY} />}
                    maxLength={8}
                    value={amountUpdate.toString()}
                    onChangeText={text => setAmountUpdate(text)}
                />
                <TextInput
                    style={{width: '100%', backgroundColor: Colors.DARK, maxHeight: 180}}
                    placeholder="Note"
                    placeholderTextColor={Colors.DARK_GRAY}
                    outlineColor={Colors.DARK_GRAY}
                    activeUnderlineColor={Colors.BLUE}
                    theme={{colors: {text: 'white'}}}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={128}
                    mode='flat'
                    left={<TextInput.Icon name='note-edit' color={Colors.DARK_GRAY} />}
                    value={noteUpdate}
                    onChangeText={text => setNoteUpdate(text)}
                />
            </View>
            <View style={{height: 20}} />
            <Picker
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor={Colors.DARK_GRAY}
                selectedValue={typeUpdate}
                onValueChange={(val) => setTypeUpdate(val)}
            >
                <Picker.Item label="Select Type" value="type" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                <Picker.Item label="Income" value="income" style={styles.pickerItem}/>
                <Picker.Item label="Expense" value="expense" style={styles.pickerItem}/>
            </Picker>
            {typeUpdate == "income" ? (
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    dropdownIconColor={Colors.DARK_GRAY}
                    selectedValue={categoryUpdate}
                    onValueChange={(val) => setCategoryUpdate(val)}
                >
                    <Picker.Item label="Select Income Category" value="category" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                    <Picker.Item label="Allowance" value="allowance" style={styles.pickerItem}/>
                    <Picker.Item label="Commission" value="comission" style={styles.pickerItem}/>
                    <Picker.Item label="Gifts" value="gifts" style={styles.pickerItem}/>
                    <Picker.Item label="Interests" value="interests" style={styles.pickerItem}/>
                    <Picker.Item label="Investments" value="investments" style={styles.pickerItem}/>
                    <Picker.Item label="Salary" value="salary" style={styles.pickerItem}/>
                    <Picker.Item label="Selling" value="selling" style={styles.pickerItem}/>
                    <Picker.Item label="Miscellaneous" value="misc-income" style={styles.pickerItem}/>
                </Picker>
            ) : typeUpdate == "expense" ? (
                <Picker
                    style={styles.picker}
                    mode="dropdown"
                    dropdownIconColor={Colors.DARK_GRAY}
                    selectedValue={categoryUpdate}
                    onValueChange={(val) => setCategoryUpdate(val)}
                >
                    <Picker.Item label="Select Expense Category" value="category" style={{backgroundColor: Colors.DARK, color: Colors.DARK_GRAY}}/>
                    <Picker.Item label="Bills" value="bills" style={styles.pickerItem}/>
                    <Picker.Item label="Clothing" value="clothing" style={styles.pickerItem}/>
                    <Picker.Item label="Entertainment" value="entertainment" style={styles.pickerItem}/>
                    <Picker.Item label="Food and Drinks" value="food" style={styles.pickerItem}/>
                    <Picker.Item label="Purchases" value="purchases" style={styles.pickerItem}/>
                    <Picker.Item label="Subscriptions" value="subscriptions" style={styles.pickerItem}/>
                    <Picker.Item label="Transportation" value="transportation" style={styles.pickerItem}/>
                    <Picker.Item label="Miscellaneous" value="misc-expense" style={styles.pickerItem}/>
                </Picker>
            ) : null}
            <TouchableOpacity
                style={styles.btnUpdate}
                onPress={() => requestAnimationFrame(() => {
                    updateTransaction()
                })}
            >
                {loading ?
                    <ActivityIndicator color={'white'}/> : 
                    <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
                        Update
                    </Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default UpdateTransactionView

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
    btnUpdate: {
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