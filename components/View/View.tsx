import React from 'react';
import {ViewContainerStyle, ViewContainerStyleProps} from './styles';

type ViewContainerProps = ViewContainerStyleProps & {
  padding?: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
};
export const ViewContainer = (props: ViewContainerProps) => {
  return <ViewContainerStyle {...props}>{props.children}</ViewContainerStyle>;
};
