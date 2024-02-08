import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Camera } from 'expo-camera';

import logo from '../assets/Logo_color.png';
import general, { Button } from '../styles/general';

const qrStyle = {
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius:10,
    overflow:'hidden'
};

export default function QRscanner({setSessionVar}) {
    const [error, setError] = useState(null);
    const [hasPermission, setPermission] = useState(false);

    //#region Premisos Camara
    async function askPermission() {
      const {granted} = await Camera.requestCameraPermissionsAsync();
      setPermission(granted);
    }

    useEffect(() => {
        askPermission();
    }, []);

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
            <Text style={styles.paragraph}>
                No se consiguio permiso para usar la camara</Text>
            <Button style={styles.paragraph} title="Intentar de nuevo"
            onPress={askPermission} />
            </View>
        );
    }
    //#endregion Permisos Camara

    function scanCode(...args) {
      const data = args[0].data;
      let ts = {};
        try {
          ts = JSON.parse(data);
        } catch(e) {
          setError(e.toString());
          return;
        }

        if (ts.hasOwnProperty("marca")) {
          setSessionVar({stage: 'user-input', carro: ts});
          console.log(ts);
        } else {
          setError("El código escaneado no es compatible con esta app");
        }
        // console.log("Type: "+type+"\nData: "+data);
    }

    return (<View style={{height: '100%'}}>
        <View style={general.container} >
          <Image source={logo} style={{height: 128, margin: -32, width: undefined, aspectRatio: 3, marginLeft: -42}} />
            <View style={qrStyle}>
                <Camera
                onBarCodeScanned={scanCode}
                barCodeScannerSettings={{barCodeTypes: ['qr']}}
                style={{width: 400, height: 400}}
                />
            </View>
            <Text style={{fontSize: 22, margin: 10}}>Escanea el codigo</Text>

            <Button title='Volver' onPress={() => setSessionVar({stage: 'home'})} />

            {error === null ? undefined :
              <Text style={{backgroundColor: '#f88', color: 'red', borderRadius: 10, width: '65%', padding: 8}}>{error}</Text>
            }
        </View>
    </View>);
}

//<View style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}} >