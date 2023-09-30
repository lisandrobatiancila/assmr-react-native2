import {TextStyleContainerStyle, TextStyleProps} from './styles';
import React from 'react';

type Props = TextStyleProps & {
  text: string;
};

export const TextContainer = (props: Props) => {
  const {textTransform, fontSize, text} = props;
  return (
    <TextStyleContainerStyle textTransform={textTransform} fontSize={fontSize}>
      {text}
    </TextStyleContainerStyle>
  );
};
