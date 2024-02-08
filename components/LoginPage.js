import { View, Image, Modal } from 'react-native';

import { Button } from '../styles/general';
import img from '../assets/LoginDuroCut.jpg';

export default function LoginPage({setSessionVar}) {
  return (<View>
    <Image source={img} style={{width: '100%', height: '100%'}} />
    <Modal transparent={true}>
      <Button width='48%' style={{opacity: 0, marginTop: '96%', marginLeft: '50%',
      padding: 10}} onPress={() => setSessionVar({stage: 'home'})}/>
      <Button style={{opacity: 0, marginTop: '63.5%', marginLeft: '30%'}}
      onPress={() => setSessionVar({stage: 'singup', user: undefined})}/>
    </Modal>
  </View>);
}