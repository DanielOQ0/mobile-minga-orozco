import { createDrawerNavigator } from '@react-navigation/drawer';
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Index from '../screens/Index';
import Mangas from '../screens/Mangas';
import CustomDrawer from '../components/CustomDrawer';
import logo from '../../assets/logo.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Image, View } from 'react-native';
import CustomButtonDrawer from '../components/CustonButtonDrawer';
import Register from '../screens/Register';
import Details from '../screens/Details';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  let [token, setToken] = useState('')
  let state = useSelector(store => store.stateNavigate.state)
  const details = useSelector((store) => store.mangaClick.state);

  useFocusEffect(React.useCallback(() => {
    async function getData() {
        try {
            const value = await AsyncStorage.getItem('token');
            setToken(value)
        } catch (error) {
            console.log(error);
        }
    }
    getData();
  }, [state]));


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#4177B7',
        drawerInactiveBackgroundColor: 'rgba(255, 255, 255, 0.4)',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#000',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        headerTitleStyle:{color:"#fff"},
        headerTransparent:true,
        headerRight:()=>(
          <View style={{height:"100%", justifyContent:"center", borderColor:"#fff"}}>
            <Image source={logo} style={{height: 35, width:80, marginBottom: 10, resizeMode: 'stretch',}}/>
          </View>
        ),
        headerStyle:{
          height: 100,
        },
        headerLeft: (props) => (
          <CustomButtonDrawer {...props}/>
        ),
      }}
    >
      <Drawer.Screen 
      name="Index" 
      component={Index} 
      options={{
        drawerIcon: ({color}) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
      }}
      />
      {token?
      <Drawer.Screen 
      name="Mangas" 
      component={Mangas}
      options={{
        drawerIcon: ({color}) => (
          <Foundation name="book" size={22} color={color} />
        ),
      }} 
      />:
      <Drawer.Screen 
      name="Register" 
      component={Register} 
      options={{
        drawerIcon: ({color}) => (
          <FontAwesome5 name="user-plus" size={22} color={color} />
        ),
      }} 
      />
      }
      {details&&<Drawer.Screen 
      name="Details"
      component={Details} 
      options={{
        drawerIcon: ({color}) => (
           <Ionicons name="folder-open" size={22} color={color} />
        ),
      }} 
      />}
    </Drawer.Navigator>
  );
}
export default DrawerNavigation