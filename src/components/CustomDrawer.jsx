import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigateActions from '../store/NavigationState/actions';
import mangaClick from "../store/Details/actions";

const { mangaClicked } = mangaClick;
const {reloadState} = NavigateActions

const CustomDrawer = props => {
  let [token, setToken] = useState('')
  let [user, setUser] = useState('')
  let state = useSelector(store => store.stateNavigate.state)
  const dispatch = useDispatch()
  
  useFocusEffect(React.useCallback(() => {
    async function getData() {
        try {
            const value = await AsyncStorage.getItem('token');
            const valueUser = await AsyncStorage.getItem('user');
            setToken(value)
            setUser(JSON.parse(valueUser))
        } catch (error) {
            console.log(error);
        }
    }
    getData();
  }, [state]));

  async function deleteToken(){
    try {
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("user", "");
      dispatch(reloadState({ state: !state }))
      dispatch(mangaClicked({ state: false }));
      setToken("")
  } catch (error) {
      console.log(error);
  }
  }
  return (
    <ImageBackground source={require('../../assets/backgroundNavigation.jpg')} style={{flex: 1}}>
      <View style={{backgroundColor: "black", height:30}}></View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: 0}}>
        {token && user ?
        <ImageBackground
          source={require('../../assets/backgroundProfile.jpg')}
          style={{padding: 20}}>
          <Image
            source={user.photo?{uri: user.photo}:require('../../assets/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>{user.name}</Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>{user.email}</Text>

        </ImageBackground>:<></>}
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {token?<View style={{backgroundColor:"rgba(255, 255, 255, 0.2)", padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {deleteToken()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>:<></>}
    </ImageBackground>
  );
};

export default CustomDrawer;
