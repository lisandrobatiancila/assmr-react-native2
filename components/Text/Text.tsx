import {TextStyleContainerStyle, TextStyleProps} from './styles';
import React from 'react';

type Props = TextStyleProps & {
  fontSize?: string;
  text?: string;
};

export const TextContainer = (props: Props) => {
  return (
    <TextStyleContainerStyle {...props}>{props.text}</TextStyleContainerStyle>
  );
};
