import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// screens
import MyRentalListScreen from './screens/MyRentalListScreen';
import LoginScreen from './screens/LoginScreen';
import ManageBookingsScreen from './screens/ManageBookingsScreen';
import RentalFromScreen from './screens/RentalFormScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}


function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerStyle: { backgroundColor: 'orangered' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }
      }>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ navigation, route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name == "Rental Form") {
          return <AntDesign name="form" size={24} color={color} />
        }
        if (route.name === "Rental List") {
          return <MaterialIcons name="format-list-bulleted" size={24} color={color} />
        }
        if (route.name === "Manage Bookings") {
          return <MaterialIcons name="manage-accounts" size={24} color={color} />
        }
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Rental Form" component={RentalFromScreen} />
      <Tab.Screen name="Rental List" component={MyRentalListScreen} />
      <Tab.Screen name="Manage Bookings" component={ManageBookingsScreen} />
    </Tab.Navigator>
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
