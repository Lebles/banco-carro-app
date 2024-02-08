import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import img from '../assets/user_anon.png';
import { status_bar_height, Button, Input, Selector } from '../styles/general';

export default function SingUpPage({session, setSessionVar}) {
  const [ inputs, setInputs ] = useState({});
  const setModel = (value, name) => setInputs({...inputs, [name]: value});
  const env = [ inputs, setModel ];

  useEffect(() => setInputs(session.user), []);

  function summit() {
    if (Object.keys(inputs).length >= 12) {
      setSessionVar({user: inputs, stage: 'home'});
    }
    console.log(JSON.stringify(inputs));
  }

  return (<KeyboardAwareScrollView extraHeight={10}>
    <View style={{alignItems: 'center', marginTop: status_bar_height}}>
      <Image source={img} style={{width: 300, height: 300}}/>
      <Button title='Cambiar Imagen' width={-1}
      style={{fontSize: 16, marginBottom: 60}} />
      <Input title='Nombres' id='nombre' formModel={env} />
      <Input title='Apellidos' id='apellido' formModel={env} />
      <Input title='Celular' id='celular' formModel={env} type='telefono' />
      <Input title='Telefono Residencial' id='tel1' formModel={env} type='telefono' />
      <Input title='Telefono de Oficina' id='tel2' formModel={env} type='telefono' />
      <Input title='Correo Electronico' id='correo' formModel={env} />

      <View style={{height: 2, width: '80%', backgroundColor: 'black', marginVertical: 30}}></View>
    
      <Selector title='Fuente de Ingreso' id='empleo' setModel={setModel}
      options={['Empleado Publico', 'Empleado Privado', 'Independiente']} />
      <Selector title='Tipo de Vivienda' id='casa' setModel={setModel}
      options={['Propia', 'Alquilada', 'Comprando con Prestamo', 'Hipotecada', 'Familiar']} />
      <Input title='Lugar de Trabajo' id='trabajo' formModel={env} />
      <Input title='Posicion Actual' id='posicion' formModel={env} />
      <Input title='Ingresos Mesuales (RD$)' id='ingresos' formModel={env} type='dinero' />
      <Input title='Años de servicios' id='tiempo' formModel={env} type='numero' />

      <Button title='Enviar' style={{marginTop: 60}} onPress={summit} />
    </View>
  </KeyboardAwareScrollView>);
}