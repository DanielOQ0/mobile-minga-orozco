import { useNavigation } from '@react-navigation/native';
import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {View , ImageBackground , Dimensions , StyleSheet, Text , Image  , TextInput, TouchableOpacity} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function SingUpForm() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()

    async function handleSubmit() {
      let data = {
        name: name,
        email: email,
        photo: photo,
        password: password
    }
    
    let url = 'https://minga-host.onrender.com/auth/signup'
    try {
      setLoading(true)
        await axios.post(url, data)
        console.log('creado')
        setTimeout(() => {
        setLoading(false);
      }, 3000);
      navigation.navigate("Home")
      Alert.alert(
        'Account created!',
        'Your account has been created successfully.',
      );
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
    }

  return (
    <View style={style.containerSingUp}>
        <ImageBackground source={require('../../assets/backgroundHero.jpg')} style={style.backgroundSingUp}>

            <Text style={style.titleSingUp}>Welcome!</Text>
            <Text style={style.subtitleSingUp}>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>
            <View style={style.fieldset}>
                <Text style={style.legend}>Name</Text>
                <View style={style.legendCont}>
                <TextInput
                    style={style.input}
                    id="name"
                    name="name"
                    required
                    onChangeText={(inputText) => setName(inputText)}
                />
                </View>
            </View>
            <View style={style.fieldset}>
                <Text style={style.legend}>Email</Text>
                <View style={style.legendCont}>
                <TextInput
                    style={style.input}
                    id="email"
                    name="email"
                    required
                    onChangeText={(inputText) => setEmail(inputText)}
                />
                </View>
            </View>
            <View style={style.fieldset}>
                <Text style={style.legend}>Photo</Text>
                <View style={style.legendCont}>
                <TextInput
                    style={style.input}
                    id="photo"
                    name="photo"
                    required
                    onChangeText={(inputText) => setPhoto(inputText)}
                />
                </View>
            </View>
            <View style={style.fieldset}>
                <Text style={style.legend}>Password</Text>
                <View style={style.legendCont}>
                <TextInput
                    style={style.input}
                    secureTextEntry={true}
                    id="password"
                    name="password"
                    required
                    onChangeText={(inputText) => setPassword(inputText)}
                />
                </View>
            </View>
            <TouchableOpacity style={style.buttonSingUp} onPress={handleSubmit}>
                <Text style={style.buttonTextSingUp}>Sign Up</Text>
                <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
            </TouchableOpacity>
            <View style={style.parrafosForm}>
                <Text style={style.subtitleSingUp}>
                Already have an account? 
                <Text
                    style={style.parrafosFormText}
                    onPress={() => {
                    navigation.navigate('Index');
                    }}>
                    {' '}
                    Sign In
                </Text>
                </Text>
            </View>
        </ImageBackground>
    </View>
  )
}
const style = StyleSheet.create({
    containerSingUp:{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: "black"
    },
    backgroundSingUp: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSingUp:{
        fontSize:30,
        color:"#fff",
        margin:10,
        marginTop: 50
    },
    subtitleSingUp:{
        fontSize:15,
        color:"#fff",
        margin:10,
        textAlign:"center"
    },
    fieldset: {
        display: "flex",
        alignItems: "flex-start",
        width: 410,
        height: 65,
        width: "90%",
        justifyContent: "flex-start",
        background: "#EBEBEB",
        borderBottomWidth: 1,
        margin:10
      },
      legendCont:{
        display: "flex",
        width:"100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      legend: {
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: 1,
        fontWeight: 500,
        color: "#fff",
      },
      input: {
        width: "90%",
        backgroundColor: "transparent",
        height: 45,
        fontSize: 15,
        padding: 11,
        borderRadius: 5,
      },
      buttonSingUp: {
        backgroundColor: "black",
        borderRadius: 10,
        height: 60,
        marginBottom: 20,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
      },
      
      buttonTextSingUp: {
        color: "white"
      },
      parrafosForm: {
        display: "flex",
        gap: 17,
        width: "100%",
        marginTop: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
    
      parrafosFormText:{
        color: "#FA0003",
        fontWeight: 700,
      },
})
export default SingUpForm