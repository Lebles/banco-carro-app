import { useState, useEffect } from 'react';
import { Text, View, Animated } from 'react-native';

import { Semicirculo } from '../styles/figures';
import { Button } from '../styles/general';

export default function SummitPage({setSessionVar}) {
  const animation = useState(new Animated.Value(0))[0];

  const [estado, setEstado] = useState(false);

  useEffect(() => {
    const ani = Animated.timing(animation, {
      toValue: 3.1416 * 2,
      duration: 1000,
      easing: (x) => x,
      useNativeDriver: false
    });
    Animated.loop(ani).start();

    setTimeout(() => setEstado(true), Math.random() * 5000 + 1000);

  }, []);

  if (estado) {// 
    const f1 = () => setSessionVar({stage: 'home'});

    return (<View style={{alignItems: 'center', justifyContent: 'center',
    height: '100%'}}><Text style={{fontSize: 32, marginHorizontal: 30,
    marginBottom: 20}}>Solicitud Enviada!</Text>
    <Button title='Terminado' onPress={f1} width='auto' /></View>);
  }

  return (<View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
    <Animated.View style={{transform: [{rotateZ: animation}]}}><Semicirculo /></Animated.View>
    <Text style={{fontSize: 18, marginTop: 30}}>Enviando formulario</Text>
  </View>);
}

// <View></View>