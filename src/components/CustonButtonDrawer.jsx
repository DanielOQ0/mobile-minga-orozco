import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CustomButtonDrawer() {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity
          onPress={()=>{openMenu()}}
          >
            <Ionicons name="menu" size={35} style={{color:"#fff", marginLeft: 8}} />
    </TouchableOpacity>
  )
}
export default CustomButtonDrawer