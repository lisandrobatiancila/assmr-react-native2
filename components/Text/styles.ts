import {Text, TextProps} from 'react-native';
import {styled} from 'styled-components';

export type TextStyleProps = TextProps & {
  textTransform?: string;
  fontSize?: string;
  textAlign?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
  margin?: string;
};
export const TextStyleContainerStyle = styled(Text)<TextStyleProps>`
  font-size: ${(props: TextStyleProps) => props.fontSize ?? '15px'};
  text-transform: ${(props: TextStyleProps) => props.textTransform ?? 'none'};
  text-align: ${(props: TextStyleProps) => props.textAlign ?? 'center'};
  color: ${(props: TextStyleProps) => props.color ?? '#000'};
  font-weight: ${(props: TextStyleProps) => props.fontWeight ?? 200};
  padding: ${(props: TextStyleProps) => props.padding ?? 0};
  margin: ${(props: TextStyleProps) => props.margin ?? 0};
`;
