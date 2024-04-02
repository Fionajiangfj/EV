import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// screens
import MyRentalListScreen from './screens/MyRentalListScreen';
import RentalFromScreen from './screens/RentalFormScreen';

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
        <Tab.Screen name="Rental List" component={MyRentalListScreen} />
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
