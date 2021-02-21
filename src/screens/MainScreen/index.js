import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { withStore } from "../../Store";


export default withStore((props) => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    setUser(props.store.userInfo)
  }, [props.store.userInfo])


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Olá, {user && user.name}</Text>
          <Button
            onPress={() => {props.navigation.navigate("Summary")}}
            title="Acessar a conta"
          />
        </View>
      );
})