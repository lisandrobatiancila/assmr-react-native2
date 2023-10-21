import styled from 'styled-components';
import {View} from 'react-native';

type FlexColStyleProps = {
  padding?: string;
};

export const FlexColStyle = styled(View)<FlexColStyleProps>`
  display: flex;
  flex-direction: column;
  padding: ${(props: FlexColStyleProps) => props.padding ?? 0};
`;
