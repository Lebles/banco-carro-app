import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import perfil_img from '../assets/user_anon.png';
import carro_icon from '../assets/CarrpHome.jpg';
import qr_code_icon from '../assets/qr-code-mini.png';
import { status_bar_height } from '../styles/general';

export default function HomePage({session, setSessionVar}) {
  return (<View>
    <View style={{paddingTop: status_bar_height, backgroundColor: '#006647', padding: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Ionicons name="menu" size={32} color="white" 
        onPress={() => setSessionVar({stage: 'login'})} />
        <Text style={{flex:1, fontSize: 20, color: 'white', textAlign: 'center'}}>Scan + Tap BCM</Text>
        <Ionicons name="location-outline" size={32} color="white" />
        <View style={{width: 10}}></View>
        <Entypo name="info-with-circle" size={32} color="white" />
      </View>
      <View style={{height: 10}}></View>
      <View style={{flexDirection: 'row'}}>
        <Image source={perfil_img} style={{width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, borderColor:'white', borderWidth: 1, marginRight: 20}} />
        <Text style={{color: '#ffd100', fontSize: 18, width: '80%', textAlignVertical: 'center'}}>Bienvenido {session.user.nombre} {session.user.apellido}</Text>
      </View>
    </View>

    <View style={{height: 3, backgroundColor: '#ffd100'}}></View>

    <Image source={carro_icon} style={{width: '100%', height: '25%', marginTop: 40}} />
    <View style={{flexDirection: 'row', padding: 10}}>
      <GreateButton img={perfil_img} title='Editar Perfil' onPress={() => setSessionVar({stage: 'singup'})} />
      <View style={{width: 10}}></View>
      <GreateButton img={qr_code_icon} title='Escanear QR' onPress={() => setSessionVar({stage: 'qr-scanner'})} />
    </View>
  </View>);
}

// <View></View>

function GreateButton({ title, img, onPress }) {
  const [ press, setPress ] = useState(false);
  const bcolor = press ? '#ffd100' : undefined;

  return (<Pressable style={{borderWidth: 2, borderColor: '#ffd100', padding: 10,
  alignItems: 'center', flex: 1, backgroundColor: bcolor}}
  onPressIn={() => setPress(true)} onPress={() => onPress?.()} onPressOut={() => setPress(false)} >
    <Image source={img} style={{width: '90%', height: undefined,
    aspectRatio: 1}} />
    <Text style={{color: '#006647', fontWeight: 'bold', marginTop: 5}} >{title}</Text>
  </Pressable>);
}
