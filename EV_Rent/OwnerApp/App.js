import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import RentalFromScreen from './screens/RentalFormScreen';
import MyRentalListScreen from './screens/MyRentalListScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import MyRentalDetailsScreen from './screens/MyRentalDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RentalListStack = () => (
  <Stack.Navigator initialRouteName='My Rental List' >
    <Stack.Screen name="My Rental List" component={MyRentalListScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Rental Details" component={MyRentalDetailsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size })=> {
            if (route.name == "Rental Form") {              
              return <MaterialIcons name="person-search" size={24} color={color} />
            }
            if (route.name === "My Rental List") {              
              return <MaterialIcons name="format-list-bulleted" size={24} color={color} />
            }
          },
          tabBarActiveTintColor: '#0064B1',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: "#0064B1"
          },
          headerTintColor: "#fff"
        })}
      > 
        <Tab.Screen name="Rental Form" component={RentalFromScreen} />
        <Tab.Screen name="My Rental List" component={RentalListStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
