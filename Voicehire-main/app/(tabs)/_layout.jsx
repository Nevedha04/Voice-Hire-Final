import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors} from './../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:Colors.PRIMARY

    }}>
      <Tabs.Screen name='Home'
      options={{
        tabBarLabel:'Home',
        tabBarIcon:({color})=> <FontAwesome name="home" 
        size={24} color={color}/>
      }}/>
      <Tabs.Screen name='Explore'
      options={{
        tabBarLabel:'Explore',
        tabBarIcon:({color})=><MaterialIcons name="person-search" 
        size={24} color={color} />
      }}/>
      <Tabs.Screen name='Profile'
      options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color})=> <FontAwesome name="user-circle-o"
         size={24} color={color} />
      }}/>
    </Tabs>
  );
}