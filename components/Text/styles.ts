import {Text, TextProps} from 'react-native';
import {styled} from 'styled-components';

export type TextStyleProps = TextProps & {
  textTransform?: string;
  fontSize?: string;
};
export const TextStyleContainerStyle = styled(Text)<TextStyleProps>`
  font-size: ${(props: TextStyleProps) => props.fontSize};
  text-transform: ${(props: TextStyleProps) => props.textTransform};
`;
