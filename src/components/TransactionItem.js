import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import Colors from '../utils/Colors';


export default TransactionItem = (props) => {
    const [transaction, setTransaction] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    
    useEffect(() => {
        setTransaction(props.transaction)
    }, [props.transaction])

    const parseDate = () => {
        const date = new Date(transaction.date)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const hour = date.getHours()
        const minutes = date.getMinutes()

        const fullDate =  day + "/" + month + "/" + year + " às " + hour + ":" + minutes

        const transactionName = transaction.amount > 0 ? "Recebido em " : "Debitado em "

        return transactionName + fullDate
    }

    const parseAmmount = () => {

        const signal = transaction.amount > 0 ? "+ " : "- "
        const moneyName = "R$ "
        const value = Math.abs(transaction.amount).toFixed(2).replace('.', ',')

        return signal + moneyName + value

    }



    return(
        <TouchableOpacity  onPress={() => {setShowDetails(!showDetails)}}>
            {transaction && 
                <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{transform: [{ rotate: transaction.amount > 0 ? '0deg' : '180deg'}]}} source={require('../assets/ic_vector.png')} />
                        </View>
                        <View style={{marginHorizontal:20, alignSelf: "flex-start", justifyContent: "flex-start"}}>
                            <Text style={{fontSize: 14}}>{transaction.description}</Text>
                            {showDetails && <Text style={{fontSize: 12, color: transaction.amount > 0 ? Colors.positiveGreen : Colors.negativeRed}}>{parseDate()}</Text>}

                        </View>
                    </View>
                    <Text style={{ color: transaction.amount > 0 ? Colors.positiveGreen : Colors.negativeRed}}>{parseAmmount()}</Text>
                </View>
            }


        </TouchableOpacity>
    )

}