import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import LoginScreen from './screens/LoginScreen';
// import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import MyBookedVehicleDetailsScreen from './screens/MyBookedVehicleDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  );
}

export default App;

const StackNavigator = () => {

  return (
    <Stack.Navigator initialRouteName='Main'
      screenOptions={{
        headerStyle: { backgroundColor: '#0064B1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BookingDetails" component={MyBookedVehicleDetailsScreen} />
    </Stack.Navigator>
  );

}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
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
  );
}