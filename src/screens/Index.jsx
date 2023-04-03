import React from 'react'
import { ScrollView, View , Dimensions} from 'react-native'
import Hero from '../components/Hero'
import SingInForm from '../components/SingInForm'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Index() {
  return (
    <ScrollView style={{width:screenWidth,height:screenHeight*2, flexGrow:1}}>
        <Hero/>
        <SingInForm/>
    </ScrollView>
  )
}
