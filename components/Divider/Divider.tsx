import React, {CSSProperties} from 'react';
import {View} from 'react-native';
import {WHITE_COLOR} from '../../constants/colorConstant';

type DividerContainerProps = CSSProperties & {
  margin?: number;
  padding?: number;
  backgroundColor?: string;
  width?: number;
  height?: number;
};
export const DividerContainer = (props: DividerContainerProps) => {
  return (
    <View
      style={{
        padding: props.padding ?? 0,
        margin: props.margin ?? 0,
        backgroundColor: props.backgroundColor ?? WHITE_COLOR,
        width: props.width ?? 0,
        height: props.height ?? 0,
      }}
    />
  );
};
