import React from 'react'
import SingUpForm from '../components/SingUpForm'
import { ScrollView, Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Register() {

  return (
    <ScrollView style={{width:screenWidth, flexGrow:1, backgroundColor:"black"}}>
        <SingUpForm/>
    </ScrollView>
  )
}

export default Register