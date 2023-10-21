import React from 'react';
import {TextInputStyle} from './styles';

type TextInputContProps = {
  backgroundColor?: string;
  padding?: string;
  width?: string;
  height?: number;
  placeholder?: string;
  margin?: string;
  value?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  disabled?: boolean;
  onChangeText: (param: string) => void;
  style?: any;
};
export const TextInputContainer = (props: TextInputContProps) => {
  return <TextInputStyle {...props} />;
};
