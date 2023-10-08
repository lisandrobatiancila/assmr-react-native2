import {Text, TextProps} from 'react-native';
import {styled} from 'styled-components';

export type TextStyleProps = TextProps & {
  textTransform?: string;
  fontSize?: string;
  textAlign?: string;
  color?: string;
};
export const TextStyleContainerStyle = styled(Text)<TextStyleProps>`
  font-size: ${(props: TextStyleProps) => props.fontSize ?? '15px'};
  text-transform: ${(props: TextStyleProps) => props.textTransform ?? 'none'};
  text-align: ${(props: TextStyleProps) => props.textAlign ?? 'center'};
  color: ${(props: TextStyleProps) => props.color ?? '#000'};
`;
