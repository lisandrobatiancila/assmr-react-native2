import {TextStyleContainerStyle, TextStyleProps} from './styles';
import React from 'react';

type Props = TextStyleProps & {
  fontSize?: string;
  fontWeight?: string;
  text?: string;
};

export const TextContainer = (props: Props) => {
  return (
    <TextStyleContainerStyle {...props}>{props.text}</TextStyleContainerStyle>
  );
};
