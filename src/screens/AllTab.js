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
  Halong,
  Sapa
} from './'
import {Account, Favorite} from './src/screens';
import { theme } from './src/core/theme'
export default function AllTab(){
    const Stack = createNativeStackNavigator();
    return(
       
        <Stack.Navigator
          // initialRouteName="ImagePickerScreen"
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
         
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="ImagePickerScreen" component={ImagePickerScreen} />
          <Stack.Screen name="SinglePhoto" component={SinglePhoto} />
          <Stack.Screen name="Hanoi" component={Hanoi} />
          <Stack.Screen name="Hochiminh" component={Hochiminh} />
          <Stack.Screen name="Halong" component={Halong} />
          <Stack.Screen name="Cantho" component={Sapa} />
        </Stack.Navigator>

    )
}