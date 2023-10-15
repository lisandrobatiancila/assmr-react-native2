/* eslint-disable react/react-in-jsx-scope */
import {FlexColStyle} from './styles';

type FlexColProps = {
  padding?: string;
  children: React.ReactNode;
};

export const FlexCol = (props: FlexColProps) => {
  return <FlexColStyle {...props}>{props.children}</FlexColStyle>;
};
