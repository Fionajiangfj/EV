import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// screens
import MyRentalListScreen from './screens/MyRentalListScreen';
import LoginScreen from './screens/LoginScreen';
import ManageBookingsScreen from './screens/ManageBookingsScreen';
import RentalFormScreen from './screens/RentalFormScreen';
import MyRentalDetailsScreen from './screens/MyRentalDetailsScreen';

// import the auth variable
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="RentalDetails" component={MyRentalDetailsScreen} />
    </Stack.Navigator>
  );
}

const TabNavigator = () => {

  // Use the useNavigation hook to access navigation
  const navigation = useNavigation(); 

  return (
    <Tab.Navigator screenOptions={({ navigation, route }) => ({
      headerStyle: {
        backgroundColor: "#0064B1",
      },
      headerTintColor: "#fff",
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
      tabBarActiveTintColor: '#0064B1',
      tabBarInactiveTintColor: 'gray',
      headerStyle: {
        backgroundColor: "#0064B1"
      },
      headerTintColor: "#fff"
    })}
    >
      <Tab.Screen name="Rental Form" component={RentalFormScreen} options={{
        title: 'Rental Form', headerRight: () => (
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
      <Tab.Screen name="Rental List" component={MyRentalListScreen} options={{ title: 'Rental List' }} />
      <Tab.Screen name="Manage Bookings" component={ManageBookingsScreen} options={{ title: 'Manage Bookings' }} />
    </Tab.Navigator>
  );
}

