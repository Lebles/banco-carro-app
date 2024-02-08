import { View, Text, ScrollView } from 'react-native';

import styles, { status_bar_height, Button } from '../styles/general';

export default function VerifyPage({session, setSessionVar}) {
  return (<ScrollView>
    <View style={{alignItems: 'center', marginTop: status_bar_height}}>
      <Text style={{fontSize: 18, width: '90%', borderRadius: 10, backgroundColor: '#006647', color: '#ffd100', padding: 10, textAlign: 'justify'}}><Text style={{fontWeight: 'bold'}}>Último Paso:</Text> Confirme que toda la información de la solicitud es correcta.</Text>
      <Text style={styles.h1}>Personal</Text>
      <View style={{width: '90%'}}>
        <InfoRow title='Nombres' info={session.user.nombre} />
        <InfoRow title='Apellidos' info={session.user.apellido} />
        <InfoRow title='Celular' info={session.user.celular} />
        <InfoRow title='Teléfono Residencial' info={session.user.tel1} />
        <InfoRow title='Teléfono de Oficina' info={session.user.tel2} />
        <InfoRow title='Correo Electrónico' info={session.user.correo} />
        <InfoRow title='Fuente de Ingreso' info={session.user.empleo} />
        <InfoRow title='Tipo de Vivienda' info={session.user.casa} />
        <InfoRow title='Lugar de Trabajo' info={session.user.trabajo} />
        <InfoRow title='Posición Actual' info={session.user.posicion} />
        <InfoRow title='Ingresos Mesuales (RD$)' info={session.user.ingresos} />
        <InfoRow title='Años de servicios' info={session.user.tiempo} />
      </View>

      <Text style={styles.h1}>Vehículo</Text>
      <View style={{width: '90%'}}>
        <InfoRow title='Tipo' info={session.carro.tipo} />
        <InfoRow title='Marca' info={session.carro.marca} />
        <InfoRow title='Modelo' info={session.carro.modelo} />
        <InfoRow title='Sub-Modelo' info={session.carro.submodelo} />
        <InfoRow title='Valor' info={session.carro.valor} />
        <InfoRow title='Año' info={session.carro.anno} />
        <InfoRow title='Condición' info={session.carro.condicion} />
      </View>

      <Text style={styles.h1}>Préstamo</Text>
      <View style={{width: '90%'}}>
        <InfoRow title='Monto solicitado' info={session.halfForm.solicita} />
        <InfoRow title='Plazo de pago' info={session.halfForm.plazo} />
        <InfoRow title='Período de taza fija' info={session.halfForm.periodo} />
      </View>

      <View style={{marginTop: 60, width: '100%', flexDirection: 'row',
      justifyContent: 'space-evenly'}}>
        <Button title='Volver' onPress={() => setSessionVar({stage: 'user-input'})} />
        <Button title='Enviar' onPress={() => setSessionVar({stage: 'enviar'})} />
      </View>
    </View>
  </ScrollView>);
}

// <View></View>

function InfoRow({title, info}) {
  return(<Text style={{fontSize: 22}}><Text style={{fontWeight: 'bold'}}>{title}:</Text> {info}</Text>);
}