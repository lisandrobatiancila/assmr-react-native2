import React from 'react';
import {CardContainerStyle} from '../modal/styles';

type CardContainerProps = {
  children: React.ReactNode;
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  margin?: string;
};

export const CardContainer = ({
  children,
  padding,
  borderRadius,
  backgroundColor,
  width,
  height,
  margin,
}: CardContainerProps) => {
  return (
    <CardContainerStyle
      padding={padding}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      margin={margin}>
      {children}
    </CardContainerStyle>
  );
};
