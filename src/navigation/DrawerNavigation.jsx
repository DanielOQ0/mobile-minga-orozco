import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from '../screens/Index';
import Mangas from '../screens/Mangas';
import CustomDrawer from '../components/CustomDrawer';
import logo from '../../assets/logo.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Image, View } from 'react-native';
import CustomButtonDrawer from '../components/CustonButtonDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#4177B7',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
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
      <Drawer.Screen 
      name="Mangas" 
      component={Mangas} 
      options={{
        drawerIcon: ({color}) => (
          <Foundation name="book" size={22} color={color} />
        ),
      }} 
      />
      <Drawer.Screen 
      name="Register" 
      component={Mangas} 
      options={{
        drawerIcon: ({color}) => (
          <FontAwesome5 name="user-plus" size={22} color={color} />
        ),
      }} 
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation