import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Modal } from 'react-native';
import TransactionItem from '../../components/TransactionItem';
import { withStore } from "../../Store";
import DateRangePicker from '../../components/DateRangePicker';
import Colors from '../../utils/Colors';



export default withStore((props) => {
	const [user, setUser] = useState(null);
	const [showBalance, setShowBalance] = useState(true);
	const [showAll, setShowAll] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	let hideShowAll =  false 



	useEffect(() => {
		setUser(props.store.userInfo)
	}, [props.store.userInfo])



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

			if (transactions.length <= 3){
				hideShowAll = true
			}

			if(showAll){
				return (transactions)
			}
			else{
				return (transactions.slice(0, 3))
			}
	  }

	  return []
  }

  const returnFilter = (localFromDate, localToDate) => {
	setShowFilter(false)
	hideShowAll = false
	setFromDate(localFromDate)
	setToDate(localToDate)

  }



  return (
      <SafeAreaView style={{ flex: 1, marginTop:18}}>
          <View style={{flexDirection: 'row', alignContent: 'center', justifyContent:'space-between', marginHorizontal:20}}>
            <Text style={{fontSize: 18, color: Colors.banqiPink }}>meu<Text style={{fontSize:22, fontWeight:'bold'}}>banQi</Text></Text>
			<TouchableOpacity onPress={() => {setShowFilter(true)}}>
			{fromDate == null || toDate == null ? 
				<Image style={styles.balanceIcon} source={require('../../assets/ic_filter.png')}/> :
				<Image style={styles.balanceIcon} source={require('../../assets/ic_filter_selected.png')}/>
			}  
			</TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', marginTop:28}}>Meu saldo:</Text>
          <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 8}}>
            <Text style={{fontSize: 20, fontWeight:'bold', color: Colors.standartGrey, backgroundColor:  showBalance ? 'transparent' : Colors.standartGrey  }}>R$ <Text style={{fontSize: 24, color: Colors.standartGrey, fontWeight:'bold'}}>{user && user.balance}</Text></Text>
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
              data={filterTransactions()}
              renderItem={({item}) => (<TransactionItem transaction={item}/>)}
			  extraData={fromDate, toDate}
              keyExtractor={item => item._id}
              ListHeaderComponent={<Text>Historico de transações</Text>}
              ListHeaderComponentStyle={{marginBottom: 30}}
              ListFooterComponent={!hideShowAll && <TouchableOpacity onPress={() => {setShowAll(!showAll)}}><Text style={{fontWeight:'bold', color: Colors.cyaneBlue}}>{showAll ? "VER MENOS" : "VER MAIS"}</Text></TouchableOpacity>}
              ListFooterComponentStyle={{marginTop: 30, justifyContent:'flex-end', flexDirection: 'row'}}
            />
          </View>


		  <Modal
			animationType="slide"
			transparent={false}
			visible={showFilter}
			onRequestClose={() => {
			Alert.alert("Modal has been closed.");
			//setShowFilter(!showFilter);
			}}>
				<View style={styles.modalView}>

					<DateRangePicker
						initialRange={[fromDate, toDate]}
						onSuccess={returnFilter}
						theme={{ markColor: Colors.banqiPink, markTextColor: 'white' }}/>
				</View>
		</Modal>


      </SafeAreaView>
    );
})

const styles = StyleSheet.create({
  balanceIcon:{
    height: 24,
    width: 24,
  },

  modalView: {
	flex:1, 
	justifyContent: 'center', 
	alignItems: 'center',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

})