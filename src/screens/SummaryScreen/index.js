import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import TransactionItem from '../../components/TransactionItem';
import { withStore } from "../../Store";
import DateRangePicker from '../../components/DateRangePicker';



export default withStore((props) => {
	const [user, setUser] = useState(null);
	const [showBalance, setShowBalance] = useState(true);
	const [showAll, setShowAll] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [filteredTransactions, setFilteredTransactions] = useState([])



	useEffect(() => {
		setUser(props.store.userInfo)
	}, [props.store.userInfo])

	useEffect(() => {
		user && filterTransactions()
	}, [user, showAll])




	const filterTransactions = () => {
		if(user){
			let transactions = user.transactions

			if(fromDate != null && toDate != null){
				const fromDateLocal = Date.parse(fromDate + 'T03:00:00Z')
				const toDateLocal = Date.parse(toDate + 'T03:00:00Z')

				transactions = transactions.filter((item) => {
					let transactionDateLocal = new Date(item.date)
					transactionDateLocal.setHours(0,0,0,0)
					transactionDateLocal = transactionDateLocal.getTime()
					return transactionDateLocal >= fromDateLocal && transactionDateLocal <= toDateLocal

				})
			}
			if(showAll){
				setFilteredTransactions(transactions)
			}
			else{
				setFilteredTransactions(transactions.slice(0, 3))
			}
	  }
  }

  const returnFilter = (localFromDate, localToDate) => {
	setShowFilter(false)
	setFromDate(localFromDate)
	setToDate(localToDate)
	filterTransactions()
  }



  return (
      <SafeAreaView style={{ flex: 1, marginTop:18}}>
          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent:'space-between', marginHorizontal:20}}>
            <Text style={{fontSize: 18, color:"#EC008C" }}>meu<Text style={{fontSize:22, fontWeight:'bold'}}>banQi</Text></Text>
			<TouchableOpacity onPress={() => {setShowFilter(true)}}>
			{fromDate == null || toDate == null ? 
				<Image style={styles.balanceIcon} source={require('../../assets/ic_filter.png')}/> :
				<Image style={styles.balanceIcon} source={require('../../assets/ic_filter_selected.png')}/>
			}  
			</TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', marginTop:28}}>Meu saldo:</Text>
          <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 8}}>
            <Text style={{fontSize: 20, fontWeight:'bold', color: '#333333', backgroundColor:  showBalance ? 'transparent' : '#333333'  }}>R$ <Text style={{fontSize: 24, color: '#333333', fontWeight:'bold'}}>{user && user.balance}</Text></Text>
            <TouchableOpacity style={{justifyContent: 'center', marginLeft: 13}} onPress={() => {setShowBalance(!showBalance)}}>
              {showBalance ? 
                <Image style={styles.balanceIcon} source={require('../../assets/eye_off_outline.png')} /> :
                <Image style={styles.balanceIcon} source={require('../../assets/eye_outline.png')}/>}
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, marginTop: 40}}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 20, marginHorizontal: 20 }}
              ItemSeparatorComponent={() => <Image style={{marginVertical: 5, marginLeft: 11}} source={require('../../assets/line.png')} />}
              data={filteredTransactions}
              renderItem={({item}) => (<TransactionItem transaction={item}/>)}
			  extraData={filteredTransactions, fromDate, toDate}
              keyExtractor={item => item._id}
              ListHeaderComponent={<Text>Historico de transações</Text>}
              ListHeaderComponentStyle={{marginBottom: 30}}
              ListFooterComponent={filteredTransactions.length >= 3 && <TouchableOpacity onPress={() => {setShowAll(!showAll)}}><Text style={{fontWeight:'bold', color: '#00AEEF'}}>{showAll ? "VER MENOS" : "VER MAIS"}</Text></TouchableOpacity>}
              ListFooterComponentStyle={{marginTop: 30, justifyContent:'flex-end', flexDirection: 'row'}}
            />
          </View>


		  {showFilter && <DateRangePicker
			initialRange={[fromDate, toDate]}
			onSuccess={returnFilter}
			theme={{ markColor: '#EC008C', markTextColor: 'white' }}/>}

      </SafeAreaView>
    );
})

const styles = StyleSheet.create({
  balanceIcon:{
    height: 24,
    width: 24,
  }

})