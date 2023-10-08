import React from 'react';
import {FlexRow} from './styles';

type FlexRowContProps = {
  children: React.ReactNode;
};
export const FlexRowContainer = (props: FlexRowContProps) => {
  return <FlexRow>{props.children}</FlexRow>;
};
