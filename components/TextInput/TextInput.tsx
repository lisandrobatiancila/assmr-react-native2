import React from 'react';
import {TextInputStyle} from './styles';

type TextInputContProps = {
  backgroundColor?: string;
  padding?: string;
  width?: string;
  placeholder?: string;
  margin?: string;
  value?: string;
  onChangeText: (param: string) => void;
};
export const TextInputContainer = (props: TextInputContProps) => {
  return <TextInputStyle {...props} />;
};
