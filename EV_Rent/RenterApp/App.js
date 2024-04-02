import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import MyReservationsScreen from './screens/MyReservationsScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from '../RenterApp/screens/LoginScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size })=> {
            if (route.name == "Home") {              
              return <MaterialIcons name="map" size={24} color={color} />
            }
            if (route.name === "My Reservations") {              
              return <MaterialIcons name="format-list-bulleted" size={24} color={color} />
            }
          },
          tabBarActiveTintColor: '#0064B1',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#0064B1',
          },
          headerTintColor: '#fff'
        })}
      > 
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Reservations" component={MyReservationsScreen} />
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
