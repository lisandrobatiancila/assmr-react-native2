import React from 'react';
import {View} from 'react-native';

type AssmrBadgeProps = {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
  backgroundColor?: string;
  margin?: number;
};
export const AssmrBadge = (props: AssmrBadgeProps) => {
  function settingProps() {
    return {
      margin: props.margin ?? 0,
      padding: props.padding ?? 5,
      borderRadius: props.borderRadius ?? 0,
      backgroundColor: props.backgroundColor ?? 'teal',
    };
  }
  return <View style={settingProps()}>{props.children}</View>;
};
