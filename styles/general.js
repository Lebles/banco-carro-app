import { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  StatusBar,
  View,
  TextInput,
  Animated
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown';

const ScreenWidth = Dimensions.get("screen").width;

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text_input: {
      fontSize: 16,
      padding: 8,
      width: ScreenWidth * 0.85,
      borderColor: "#555",
      borderRadius: 5,
      borderWidth: 1.2,
      marginVertical: 10
    },
    h1: {
      fontSize: 32,
      textAlign: 'center',
      marginTop: 60,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    text: {
      fontSize: 22,
    }
});

export const status_bar_height = StatusBar.currentHeight + 10;

export function Button({title, onPress, style, width, pressStyle}) {
  const [ pressed, setPressed ] = useState(false);

  let iStyle = {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#006647',
    width: width === undefined ? ScreenWidth * 0.4 : width,
    ...style
  };

  bcolor = iStyle.color === 'white' ? '#eee' : iStyle.color;
  pressStyle = {backgroundColor: bcolor, color: iStyle.backgroundColor, ...pressStyle};
  
  if (pressed) iStyle = {...iStyle, ...pressStyle};

  return (
    <Pressable 
    onPressIn={() => setPressed(true)} 
    onPress={() => onPress?.()} 
    onPressOut={() => setPressed(false)} >
      <Text style={iStyle} >{title}</Text>
    </Pressable>
  );
}

export function Input({title, id, formModel, type, props}) {
  //#region cool-effect
  const progress = useState(new Animated.Value(1))[0];

  if (formModel[0][id]) progress.setValue(0);

  function animate() {
    Animated.timing(progress, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }
  function unAnimate() {
    if (formModel[0][id]) return;

    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }

  const a_top = progress.interpolate({inputRange: [0, 1], outputRange: [0, 28]});
  const a_size = progress.interpolate({inputRange: [0, 1], outputRange: [16, 22]});
  //#endregion cool-effect

  const i_mode = type ? 'numeric' : undefined;
  function format(text) {
    let divs = [];

    if (!type) { formModel[1](text, id); return;}
    else if (type === 'telefono') divs = [3, 7, 10];
    else if (type === 'cedula') divs = [3, 11, 11];
    else if (type === 'dinero') {
      let ntext = text.replace(/\D/g, '');

      let start = ntext.length % 3;
      if (start === 0) start = 3;
      for(let i = start; i < ntext.length; i+=4) {
        ntext = ntext.substring(0, i) + ',' + ntext.substring(i);
      }
      formModel[1](ntext, id);
      return;
    } else {formModel[1](text, id); return;}

    let ntext = text.replace(/\D/g, '');
    const max = divs.pop();
    if (ntext.length > max) ntext = ntext.substring(0, max);

    for (let e of divs) {
      if (e >= ntext.length) break;
      ntext = ntext.substring(0, e) + '-' + ntext.substring(e);
    }
    formModel[1](ntext, id);
  }

  return (<View style={{width: '70%', marginBottom: 20, height: 55, justifyContent: 'flex-end'}}>
  <Animated.Text style={{position: 'relative', top: a_top, fontSize: a_size, color: 'gray'}}>{title}</Animated.Text>
  <TextInput value={formModel[0][id]} style={{fontSize: 22, borderBottomWidth: 1}}
  onChangeText={format} inputMode={i_mode}
  onFocus={animate} onEndEditing={unAnimate}
  {...props}/></View>);
}

export function Selector({title, id, setModel, options, default_value, props}) {
  return(<View style={{width: '70%', marginTop: 3, marginBottom: 20}}>
    <Text style={{color: 'gray', fontSize: 16}}>{title}</Text>
    <SelectDropdown
      data={options}
      defaultValue={default_value}
      onSelect={(selectedItem, index) => {
        setModel(selectedItem, id);
      }}
      buttonStyle={{borderRadius: 5, width: '100%'}}
      buttonTextStyle={{fontSize: 22, textAlign: 'left'}}
      defaultButtonText='Selecciona...'
      statusBarTranslucent={true}
      {...props}
    />
  </View>);
}