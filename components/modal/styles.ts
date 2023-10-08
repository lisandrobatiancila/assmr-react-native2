import {Card} from 'react-native-paper';
import {styled} from 'styled-components';

export type CardStyleProps = {
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  margin?: string;
};

export const CardContainerStyle = styled(Card)<CardStyleProps>`
  padding: ${(props: CardStyleProps) => props.padding ?? 0};
  borderradius: ${(props: CardStyleProps) => props.borderRadius ?? 0};
  backgroundcolor: ${(props: CardStyleProps) =>
    props.backgroundColor ?? '#000'};
  width: ${(props: CardStyleProps) => props.width ?? 'auto'};
  height: ${(props: CardStyleProps) => props.height ?? 'auto'};
  margin: ${(props: CardStyleProps) => props.margin ?? 0};
  z-index: -1;
`;
