import React from 'react';
import {ViewContainerStyle, ViewContainerStyleProps} from './styles';

type ViewContainerProps = ViewContainerStyleProps & {
  children: React.ReactNode;
};
export const ViewContainer = (props: ViewContainerProps) => {
  const {children, height, padding} = props;
  return (
    <ViewContainerStyle height={height} padding={padding}>
      {children}
    </ViewContainerStyle>
  );
};
