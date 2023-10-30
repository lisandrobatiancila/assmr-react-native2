import React from 'react';
import {View} from 'react-native';

type AssmrBadgeProps = {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
  backgroundColor?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  width?: number;
};
export const AssmrBadge = (props: AssmrBadgeProps) => {
  function settingProps() {
    return {
      marginTop: props.marginTop ?? 0,
      marginRight: props.marginRight ?? 0,
      marginBottom: props.marginBottom ?? 0,
      marginLeft: props.marginLeft ?? 0,
      padding: props.padding ?? 5,
      borderRadius: props.borderRadius ?? 0,
      backgroundColor: props.backgroundColor ?? 'teal',
      width: props.width ?? 100,
    };
  }
  return <View style={settingProps()}>{props.children}</View>;
};
