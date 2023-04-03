import React from 'react'
import {View , ImageBackground , Dimensions , StyleSheet, Text , Image  , TextInput} from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function SingInForm() {
  return (
    <View style={style.containerSingIn}>
        <ImageBackground source={require('../../assets/backgroundHero.jpg')} style={style.backgroundSingIn}>
            <Image source={require('../../assets/logo.png')}/>
            <Text>Welcome!</Text>
            <Text>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        color: "#5F5F5F",
      },
      input: {
        width: "90%",
        backgroundColor: "transparent",
        height: 45,
        fontSize: 15,
        padding: 11,
        borderRadius: 5,
      },
})
export default SingInForm