import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// icons
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Stack = createStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

