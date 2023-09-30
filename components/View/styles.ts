import {styled} from 'styled-components';
import {View} from 'react-native';

export type ViewContainerStyleProps = {
  height?: string;
  padding?: string;
};
export const ViewContainerStyle = styled(View)<ViewContainerStyleProps>`
  padding: ${(props: ViewContainerStyleProps) => props.padding};
`;
