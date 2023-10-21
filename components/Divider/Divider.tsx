import React, {CSSProperties} from 'react';
import {View} from 'react-native';

type DividerContainerProps = CSSProperties & {
  margin?: number;
  padding?: number;
};
export const DividerContainer = (props: DividerContainerProps) => {
  return (
    <View style={{padding: props.padding ?? 0, margin: props.margin ?? 0}} />
  );
};
