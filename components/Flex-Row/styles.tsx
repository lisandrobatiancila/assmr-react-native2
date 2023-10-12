import {View} from 'react-native';
import styled, {CSSProperties} from 'styled-components';

type FlexRowProps = CSSProperties & {
  justifyContent?: string;
};
export const FlexRow = styled(View)<FlexRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: FlexRowProps) => props.justifyContent ?? 'auto'};
`;
