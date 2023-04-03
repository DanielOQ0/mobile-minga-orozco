import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text , StyleSheet, View, ImageBackground , Dimensions, Image, Button, TouchableOpacity} from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Hero() {
    const navigation = useNavigation();
    
  return (
    <View style={style.hero}>
        <ImageBackground source={require('../../assets/backgroundHero.jpg')} style={style.backgroundHeroImage}>
        <Text style={style.titleHero}>Best manga reader</Text>
        <Text style={style.subtitleHero}>Your favourite manga reader 😏</Text>
        <TouchableOpacity style={style.buttonHero}
            onPress={() => {navigation.navigate('Mangas');}}
        >
            <Text style={style.buttonTextHero}>See Mangas</Text>
        </TouchableOpacity>
        <View>
            <View style={style.containerHeroImages}>
                <View style={style.containerHeroImage1}>
                    <Image style={style.heroImage} source={require('../../assets/hero1.png')}/>
                    <Image style={style.heroImage} source={require('../../assets/hero1-2.png')}/>
                </View>
                <View style={style.containerHeroImage2}>
                    <Image style={style.heroImage} source={require('../../assets/hero2.png')}/>
                    <Image style={style.heroImage} source={require('../../assets/hero2-1.png')}/>
                </View>
            </View>
            <ImageBackground style={style.shadowHeroImages} source={require('../../assets/shadow-hero.png')}/>
        </View>
        </ImageBackground>
    </View>
    

  )
}

const style = StyleSheet.create({
    hero:{
        width: screenWidth,
        height: screenHeight,
    },
    backgroundHeroImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    heroImage:{
        width: 160,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    containerHeroImages:{
        width: 340,
        height:320,
        flexDirection:"row",
        justifyContent:"space-between",
        overflow:"hidden"
    },
    shadowHeroImages:{
        position:"absolute",
        width:340, 
        height:320
    },
    containerHeroImage1:{
        justifyContent:"space-between",
        height:410
    },
    containerHeroImage2:{
        justifyContent:"space-between",
        height:410,
        marginTop:35
    },
    titleHero:{
        fontSize:50,
        color:"#fff",
        textAlign:"center",
        marginBottom:35
    },
    subtitleHero:{
        fontSize:20,
        color:"#000",
        marginBottom:20
    },
    buttonHero:{
        alignItems:"center",
        justifyContent:"center",
        marginBottom:45,
        backgroundColor:"#3264C2",
        width:120,
        height:35,
        borderRadius:8
    },
    buttonTextHero:{
        fontSize:15,
        color:"#fff"
    }
})

export default Hero