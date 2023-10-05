import { Card } from 'react-native-paper';
import { styled } from 'styled-components';

export type CardStyleProps = {
    padding?: string,
    borderRadius?: string,
    backgroundColor?: string
}

export const CardContainerStyle = styled(Card)<CardStyleProps>`
    padding: ${(props: CardStyleProps) => props.padding};
    borderRadius: ${(props: CardStyleProps) => props.borderRadius};
    backgroundColor: ${(props: CardStyleProps) => props.backgroundColor};
`;