import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import LoginScreen from './screens/LoginScreen';
// import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';

// import the auth variable
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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
    <Stack.Navigator initialRouteName='Login'
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

  const navigation = useNavigation(); // Use the useNavigation hook to access navigation

  return (
    <Tab.Navigator
      screenOptions={({  navigation, route  }) => ({
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
      <Tab.Screen name="Home" component={HomeScreen} options={{
        title: 'Home', headerRight: () => (
          <MaterialIcons
            name="logout"
            size={24}
            color="white"
            onPress={async () => {
              try {
                await signOut(auth)
                alert("Logout complete!")
                navigation.replace('Login');
              } catch (err) {
                console.log(err)
              }
            }}
            style={{paddingRight: 10}}
          />
        ),
      }} />
      <Tab.Screen name="My Reservations" component={MyReservationsScreen} />
    </Tab.Navigator>
  );
}