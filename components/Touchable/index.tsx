import React from 'react';
import {TouchableStyle} from './styles';

type TouchableContainerProps = {
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  margin?: string;
  onPress?: (params: any) => void;
  children: React.ReactNode;
};

export const TouchableContainer = (props: TouchableContainerProps) => {
  return (
    <TouchableStyle onPress={props.onAssume} {...props}>
      {props.children}
    </TouchableStyle>
  );
};
