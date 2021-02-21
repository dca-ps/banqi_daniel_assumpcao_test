import React from 'react';

import { Image } from 'react-native';

import StoreProvider from './Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import {MainScreen, SummaryScreen} from './screens'
import Colors from './utils/Colors';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();



const App = props => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return focused ? <Image source={require('./assets/ic_home_selected.png')}/> : <Image source={require('./assets/ic_home.png')}/>;

            } else if (route.name === 'Summary') {
              return focused ? <Image source={require('./assets/ic_carnes_selected.png')}/> : <Image source={require('./assets/ic_carnes.png')}/>;
            }

            // You can return any component that you like here!
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.banqiPink,
          inactiveTintColor: Colors.standartGrey,
        }}
      >
          <Tab.Screen name="Home" component={MainScreen} />
          <Tab.Screen name="Summary" component={SummaryScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;