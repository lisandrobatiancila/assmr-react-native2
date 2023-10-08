import {styled} from 'styled-components';
import {View} from 'react-native';

export type ViewContainerStyleProps = {
  width?: string;
  height?: string;
  padding?: string;
};
export const ViewContainerStyle = styled(View)<ViewContainerStyleProps>`
  padding: ${(props: ViewContainerStyleProps) => props.padding};
  width: ${(props: ViewContainerStyleProps) => props.width};
  height: ${(props: ViewContainerStyleProps) => props.height};
`;
