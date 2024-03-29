import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import RentalFromScreen from './screens/RentalFormScreen';
import RentalListScreen from './screens/RentalListScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size })=> {
            if (route.name == "Rental Form") {              
              return <MaterialIcons name="person-search" size={24} color={color} />
            }
            if (route.name === "Rental List") {              
              return <MaterialIcons name="format-list-bulleted" size={24} color={color} />
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      > 
        <Tab.Screen name="Rental Form" component={RentalFromScreen} />
        <Tab.Screen name="Rental List" component={RentalListScreen} />
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
