import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withStore } from "../../Store";
import Colors from '../../utils/Colors';


export default withStore((props) => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    setUser(props.store.userInfo)
  }, [props.store.userInfo])


    return (
		<View style={styles.mainContainer}>
			<Image style={styles.logoBanqi} source={require('../../assets/logo_banqi.png')} />
			<View style={styles.infoContainer}>

				<Text style={styles.nameClient}>Olá, {user && user.name}</Text>

				<TouchableOpacity style={styles.buttons} onPress={() => {props.navigation.navigate("Summary")}}>
					<Text style={styles.buttonsText}>Acessar sua conta</Text>
				</TouchableOpacity>
			</View>



		</View>
      );
})


const styles = StyleSheet.create({
	mainContainer:{
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'space-evenly', 
		backgroundColor: Colors.banqiPink
	},
	infoContainer:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	nameClient:{
		fontSize: 25,
	},
	logoBanqi:{
		height: 200,
		width: 200,
	},
    buttons:{
        height: 50,
        width: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 20,
    },
    buttonsText:{
        color: 'black',
		fontWeight: 'bold'

    }
  
  })