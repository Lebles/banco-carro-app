import { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';

import carro_img from '../assets/CarrpHome.jpg'
import { status_bar_height, Button, Input, Selector } from '../styles/general';

export default function UserInputPage({session, setSessionVar}) {
  const [ inputs, setInputs ] = useState({});
  const setModel = (value, key) => setInputs({...inputs, [key]: value});
  const env = [inputs, setModel];

  function summit() {
    if (Object.keys(inputs).length >= 3) {
      setSessionVar({halfForm: inputs, stage: 'confirmar'});
    }
    console.log(JSON.stringify(inputs));
  }

  return (<View style={{alignItems: 'center', height: '100%', paddingTop: status_bar_height}}>
    <Image source={carro_img} style={{marginVertical: -128, backgroundColor: 'green'}} />
    <View style={{borderRadius: 10, borderWidth: 3, borderColor: '#ffd100', padding: 8, flexDirection: 'row', width: '90%', marginBottom: 10, justifyContent: 'space-around'}}>
      <Text style={{fontSize: 18}}>{session.carro.marca}</Text>
      <Text style={{fontSize: 18}}>{session.carro.modelo}</Text>
      <Text style={{fontSize: 18}}>{session.carro.submodelo}</Text>
    </View>
    <View style={{flexDirection: 'row', width: '90%', marginBottom: 10}}>
      <Block icon="calendar" info={session.carro.anno} />
      <Block icon="star-half-o" info={session.carro.condicion} />
      <Block icon="dollar" info={session.carro.valor} />
      <Block icon="car" info={session.carro.tipo} iregular={true} />
    </View>
    
    <Text style={{fontSize: 18, width: '90%', borderRadius: 10, backgroundColor: '#006647', color: '#ffd100', padding: 10, textAlign: 'justify'}}>Complete los datos faltantes para finalizar de hacer su solicitud</Text>
    <Input title='Monto solicitado' id='solicita' formModel={env} type='dinero' />
    <Selector title='Plazo de pago' id='plazo' setModel={setModel}
    options={[6,12,24,48,60].map(each => each+' meses')} />
    <Selector title='Periodo de taza fija' id='periodo' setModel={setModel}
    options={[6,12,24,48,60].map(each => each+' meses')} />
    
    <View style={{flex: 1}}></View>
    <View style={{width: '100%',flexDirection:'row',justifyContent:'space-evenly'}}>
      <Button title='Volver' onPress={() => setSessionVar({stage: 'home'})} />
      <Button title='Continuar' onPress={summit} />
    </View>
  </View>);
}

// <View></View>

function Block({icon, info, iregular}) {
  return(<View style={{borderRadius: 10, borderWidth: 3, borderColor: '#ffd100', padding: 8, flex: 1, justifyContent: 'center', marginRight: iregular ? 0 : 10, alignItems: 'center'}}>
    <FontAwesome name={icon} size={32} color="#006647" />
    <Text>{info}</Text>
  </View>);
}