import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// screens
import HomeScreen from './HomeScreen';
import MyReservationsScreen from './MyReservationsScreen';

// icons
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({color })=> {
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

