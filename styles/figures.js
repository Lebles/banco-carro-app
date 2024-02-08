import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type Props = {
  width: number;
  diameter: number;
  color: string;
  style?: StyleProp<ViewStyle>;
};

const Semicirculo: React.FC<Props> =
({width=10, diameter=100, color='lightgray', style}) => { 
  const inner_circle_width = diameter - width * 2;
  const radius = diameter / 2;

  return(<View style={[{width: diameter, height: diameter, borderRadius: radius, backgroundColor: color}, style]}><View style={{width: inner_circle_width, height: inner_circle_width, borderRadius: inner_circle_width / 2, margin: width, backgroundColor: 'white'}}></View><View style={{width: diameter, height: radius, marginTop: -radius, backgroundColor: 'white', borderBottomLeftRadius: radius, borderBottomRightRadius: radius}}></View></View>);
};

export { Semicirculo };