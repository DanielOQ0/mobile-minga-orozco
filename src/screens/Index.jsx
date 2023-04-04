import React, {useState} from 'react';
import { ScrollView, View , Dimensions} from 'react-native'
import Hero from '../components/Hero'
import SingInForm from '../components/SingInForm'
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Index() {

    let [token, setToken] = useState('')
    let state = useSelector(store => store.stateNavigate.state)
  
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
    <ScrollView style={{width:screenWidth,height:screenHeight*2, flexGrow:1, backgroundColor:"black"}}>
        <Hero/>
        {token?<></>:
        <SingInForm/>
        }
    </ScrollView>
  )
}
