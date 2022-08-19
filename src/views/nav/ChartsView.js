import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, Alert, Dimensions, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import { ProgressBar } from "react-native-paper";

const ChartsView = () => {

    const isFocused = useIsFocused()
    const [totalIncome, setTotalIncome] = useState(null)
    const [totalExpense, setTotalExpense] = useState(null)
    const [allowance, setAllowance] = useState(null)
    const [commission, setCommission] = useState(null)
    const [gifts, setGifts] = useState(null)
    const [interests, setInterests] = useState(null)
    const [investments, setInvestments] = useState(null)
    const [salary, setSalary] = useState(null)
    const [selling, setSelling] = useState(null)
    const [miscIncome, setMiscIncome] = useState(null)
    const [bills, setBills] = useState(null)
    const [clothing, setClothing] = useState(null)
    const [entertainment, setEntertainment] = useState(null)
    const [food, setFood] = useState(null)
    const [purchases, setPurchases] = useState(null)
    const [subscriptions, setSubscriptions] = useState(null)
    const [transportation, setTransportation] = useState(null)
    const [miscExpense, setMiscExpense] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchIncomeAndExpense = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true)
            await axios.get(`http://10.2.71.238:8000/api/transaction/user/${userId}/data`)
                .then((response) => {
                    setTotalIncome(response.data.totalIncome)
                    setTotalExpense(response.data.totalExpense)
                })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load data! Please check your internet connection")
            console.log(e)
            return false
        } finally {
            setLoading(false)
            setRefresh(false)
        }
    }

    const fetchIncomeDetails = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true)
            await axios.get(`http://10.2.71.238:8000/api/transaction/user/${userId}/income`)
                .then((response) => {
                    setAllowance(response.data.allowance)
                    setCommission(response.data.commission)
                    setGifts(response.data.gifts)
                    setInterests(response.data.interests)
                    setInvestments(response.data.investments)
                    setSalary(response.data.salary)
                    setSelling(response.data.selling)
                    setMiscIncome(response.data.miscellaneous)
                    console.log(response.data)
                })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load data! Please check your internet connection")
            console.log(e)
            return false
        } finally {
            setLoading(false)
            setRefresh(false)
        }
    }

    const fetchExpenseDetails = async () => {
        const userId = await AsyncStorage.getItem('userId')
        try {
            setLoading(true)
            await axios.get(`http://10.2.71.238:8000/api/transaction/user/${userId}/expense`)
                .then((response) => {
                    setBills(response.data.bills)
                    setClothing(response.data.clothing)
                    setEntertainment(response.data.entertainment)
                    setFood(response.data.food)
                    setPurchases(response.data.purchases)
                    setSubscriptions(response.data.subscriptions)
                    setTransportation(response.data.transportation)
                    setMiscExpense(response.data.miscellaneous)
                })
            return true
        } catch (e) {
            Alert.alert("Error!", "Cannot load data! Please check your internet connection")
            console.log(e)
            return false
        } finally {
            setLoading(false)
            setRefresh(false)
        }
    }

    const onRefresh = () => {
        setRefresh(true)
        fetchIncomeAndExpense()
        fetchIncomeDetails()
        fetchExpenseDetails()
    }

    useEffect(() => {
        isFocused && fetchIncomeAndExpense() 
            && fetchIncomeDetails() && fetchExpenseDetails()
    }, [isFocused])

    const totalData = [
        {
            name: "Income",
            amount: totalIncome,
            color: Colors.NIGHT_GREEN,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Expense",
            amount: totalExpense * -1,
            color: Colors.NIGHT_RED,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        }
    ]

    const incomeData = [
        {
            name: "Allowance",
            amount: allowance,
            color: Colors.NIGHT_RED,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Commission",
            amount: commission,
            color: Colors.NIGHT_PINK,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Gifts",
            amount: gifts,
            color: Colors.NIGHT_PURPLE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Interests",
            amount: interests,
            color: Colors.NIGHT_BLUE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Investments",
            amount: investments,
            color: Colors.NIGHT_ORANGE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Salary",
            amount: salary,
            color: Colors.NIGHT_GREEN,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Selling",
            amount: selling,
            color: Colors.NIGHT_INDIGO,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Miscellaneous",
            amount: miscIncome,
            color: Colors.NIGHT_YELLOW,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        }
    ]

    const expenseData = [
        {
            name: "Bills",
            amount: bills,
            color: Colors.NIGHT_RED,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Clothing",
            amount: clothing,
            color: Colors.NIGHT_PINK,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Entertainment",
            amount: entertainment,
            color: Colors.NIGHT_PURPLE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Food",
            amount: food,
            color: Colors.NIGHT_YELLOW,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Purchases",
            amount: purchases,
            color: Colors.NIGHT_ORANGE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Subscriptions",
            amount: subscriptions,
            color: Colors.NIGHT_GREEN,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Transportation",
            amount: transportation,
            color: Colors.NIGHT_INDIGO,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        },
        {
            name: "Miscellaneous",
            amount: miscExpense,
            color: Colors.NIGHT_BLUE,
            legendFontSize: 15,
            legendFontColor: Colors.DARK_GRAY,
        }
    ]

    return (
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10}}>
            <View style={{flex: 0.075, justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '700'}}>Statistics</Text>
            </View>
            {loading ? (
                <ProgressBar indeterminate color={'coral'} />
            ) : (
                <ScrollView 
                    style={{flex: 0.925}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{
                        flex: 0.325, 
                        justifyContent: 'center', 
                        backgroundColor: Colors.DARK, 
                        borderRadius: 8, 
                        paddingBottom: 10
                    }}>
                        <PieChart
                            data={totalData}
                            width={WIDTH}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"amount"}
                        />
                        <View style={{
                            flex: 1, 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            paddingHorizontal: 10,
                            marginTop: 10
                        }}>
                            <Text style={{color: Colors.DARK_GRAY, fontSize: 14}}>
                                Total Income = ₹{totalIncome}
                            </Text>
                            <Text style={{color: Colors.DARK_GRAY, fontSize: 14}}>
                                Total Expense = ₹{totalExpense * -1}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 0.325, 
                        justifyContent: 'center', 
                        backgroundColor: Colors.DARK, 
                        borderRadius: 8,
                        marginTop: 20,
                        paddingBottom: 10
                    }}>
                        <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
                            <Text style={{color: Colors.DARK_GRAY, fontSize: 16}}>
                                Income
                            </Text>
                        </View>
                        <PieChart
                            data={incomeData}
                            width={WIDTH}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"amount"}
                        />
                    </View>
                    <View style={{
                        flex: 0.325, 
                        justifyContent: 'center', 
                        backgroundColor: Colors.DARK, 
                        borderRadius: 8,
                        marginTop: 20,
                        paddingBottom: 10
                    }}>
                        <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
                            <Text style={{color: Colors.DARK_GRAY, fontSize: 16}}>
                                Expense
                            </Text>
                        </View>
                        <PieChart
                            data={expenseData}
                            width={WIDTH}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"amount"}
                        />
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default ChartsView

const WIDTH = Dimensions.get('window').width

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
}