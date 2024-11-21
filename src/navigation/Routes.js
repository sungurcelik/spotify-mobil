import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SongsScreen from '../screens/SongsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: -10,
          },
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          borderWidth: 0,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Ana Sayfa',
          tabBarLabelStyle: {
            color: 'white',
            fontSize: 13,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Foundation name="home" color="white" size={25} />
            ) : (
              <Octicons name="home" color="white" size={21} />
            ),
        }}
        name="Home"
        component={HomeScreen}
      />
      
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Kitaplığın',
          tabBarLabelStyle: {
            color: 'white',
            fontSize: 13,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="library" size={24} color="white" />
            ) : (
              <Ionicons name="library-outline" size={24} color="white" />
            ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Songs" component={SongsScreen} />
        <Stack.Screen name="Info" component={SongInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
