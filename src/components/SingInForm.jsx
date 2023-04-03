import { useNavigation } from '@react-navigation/native';
import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {View , ImageBackground , Dimensions , StyleSheet, Text , Image  , TextInput, TouchableOpacity, Alert} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay/lib';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function SingInForm() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()

    async function handleSubmit(){
      let data = {
        email: email,
        password: password
      };
      
      let url = process.env.API_URL.concat("/auth/signin");
  
      try {
        setLoading(true)
        const response = await axios.post(url, data);
        const { token, user } = response.data;
        
        // Almacenar el token en AsyncStorage y luego imprimir el valor almacenado
        await AsyncStorage.setItem('token', token);
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Token almacenado:', storedToken);
        
        // Almacenar los datos del usuario en AsyncStorage y luego imprimir el valor almacenado
        await AsyncStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email,
          photo: user.photo,
        }));

        const storedUser = await AsyncStorage.getItem('user');
        console.log('Usuario almacenado:', storedUser);
        Alert.alert("Singed in successfully")
        dispatch(reloadBottomTabs({ state: !state }))
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        let errorMessage
        let type = typeof error.response.data.message
        if(type === "object"){
            errorMessage = error.response.data.message[0]
        }else{errorMessage = error.response.data.message}
        Alert.alert(errorMessage)
        setLoading(false)
      }
    }

  return (
    <View style={style.containerSingIn}>
        <ImageBackground source={require('../../assets/backgroundHero.jpg')} style={style.backgroundSingIn}>
            <Text style={style.titleSingIn}>Welcome!</Text>
            <Text style={style.subtitleSingIn}>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>
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
            <TouchableOpacity style={style.button} onPress={handleSubmit}>
                <Text style={style.buttonText}>Sign in</Text>
                <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
            </TouchableOpacity>
            <View style={style.parrafosForm}>
                <Text style={style.subtitleSingIn}>
                You don't have an account yet?
                <Text
                    style={style.parrafosFormText}
                    onPress={() => {
                    navigation.navigate('Register');
                    }}>
                    {' '}
                    Sign up
                </Text>
                </Text>
            </View>
        </ImageBackground>
    </View>
  )
}
const style = StyleSheet.create({
    containerSingIn:{
        width: screenWidth,
        height: screenHeight,
    },
    backgroundSingIn: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleSingIn:{
        fontSize:30,
        color:"#fff",
        margin:10
    },
    subtitleSingIn:{
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
      button: {
        backgroundColor: "black",
        borderRadius: 10,
        height: 60,
        marginBottom: 20,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
      },
      
      buttonText: {
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
export default SingInForm