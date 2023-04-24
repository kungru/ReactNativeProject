import React, { useEffect, useReducer, useCallback,createContext,useContext } from 'react'
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Provider } from 'react-native-paper'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Home,
  Test,
  ImagePickerScreen,
  SinglePhoto,
  Hanoi,
  Hochiminh,
  Danang,
  Sapa,
  AllTab
} from './src/screens'
import {Account, Favorite} from './src/screens';
import { theme } from './src/core/theme'
const Stack = createNativeStackNavigator();
// import BottomTabs from './src/navigation/BottomTabs';
export const ThemeContext = createContext()
// const BottomTabs = () => {
//   const Tab = createBottomTabNavigator();
//   return (
//     <Tab.Navigator
//       screenOptions={{headerShown: false}}
//       tabBarOptions={{
//         activeTintColor: '#062743',
//         inactiveTintColor: '#9ea9b3',
//         tabStyle: {
//           marginVertical: 2,
//         },
//         showLabel: false,
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name="home-sharp" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Favorite"
//         component={Favorite}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name="map-sharp" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Account"
//         component={Account}
//         options={{
//           tabBarIcon: ({size, color}) => (
//             <Icon name="person-sharp" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
const Tab = createBottomTabNavigator();

export default function App() {
  const [picID,setpicID]=useState('')
  const [picIDwidth,setpicIDwidth]=useState('')
  const [picIDheight,setpicIDheight]=useState('')
  const [userNameState,setUserNameState]=useState(false)
  const [userName,setUserName]=useState('')
  return (
    <ThemeContext.Provider value={{picID:picID,setpicID:setpicID,picIDwidth:picIDwidth,setpicIDwidth:setpicIDwidth,picIDheight:picIDheight,setpicIDheight:setpicIDheight,userNameState:userNameState,setUserNameState:setUserNameState,userName:userName,setUserName:setUserName}}>
    <Provider theme={theme} >
      <NavigationContainer>

    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AllTab"
      tabBarOptions={{
        activeTintColor: '#062743',
        inactiveTintColor: '#9ea9b3',
        tabStyle: {
          marginVertical: 2,
        },
        showLabel: false,
      }}>
     <Tab.Screen
        name="AllTab"
        component={AllTab}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home-sharp" size={size} color={color} />
          ),
        }}
      />
   {/* <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="map-sharp" size={size} color={color} />
          ),
        }}
      /> */}
{userNameState &&    
<>
<Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="map-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="person-sharp" size={size} color={color} />
          ),
        }}
      />
</>

      
      }


      </Tab.Navigator>
      </NavigationContainer>
    </Provider>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
