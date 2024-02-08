import { useState } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';

import LoginPage from './components/LoginPage';
import SingUpPage from './components/SingUpPage';
import HomePage from './components/HomePage';
import QRscaner from './components/QRscaner';
import UserInputPage from './components/UserInput';
import VerifyPage from './components/VerifyPage';
import SummitPage from './components/SummitPage';

const root = [
  { name: 'login', component: LoginPage },
  { name: 'singup', component: SingUpPage },
  { name: 'home', component: HomePage },
  { name: 'qr-scanner', component: QRscaner },
  { name: 'user-input', component: UserInputPage },
  { name: 'confirmar', component: VerifyPage },
  { name: 'enviar', component: SummitPage },
];

const starting_session_value = {
  stage: 'login',
  user: {
    nombre:"Anonimo",
    apellido:"Unknown",
    celular:"829-288-0000",
    tel1:"809-528-0000",
    tel2:"000-000-0000",
    correo:"anonimo@email.com",
    empleo:"Independiente",
    casa:"Propia",
    trabajo:"Nowhere",
    posicion:"None",
    ingresos:"00,000",
    tiempo:"00"},
  carro: {
    valor:300000,
    anno:2008,
    condicion:"Accidentado",
    tipo:"Sedan",
    marca:"Honda",
    modelo:"Accord",
    submodelo:"EX"},
  halfForm: {
    solicita:"200,000",
    plazo:"48 meses",
    periodo:"24 meses"}
};

export default function App() {
  const [ session, setSession ] = useState(starting_session_value);

  const setSessionVar = element => setSession({...session, ...element});

  let Stage = root.find(each => session.stage === each.name);
  Stage = Stage ? Stage.component : root[0].component;

  return (<SafeAreaView>
    <View>
      <Stage session={session} setSessionVar={setSessionVar} />
    </View>
  </SafeAreaView>);
}