import styled from 'styled-components';
import {TextInput} from 'react-native';

type TextInputStyleProps = {
  backgroundColor?: string;
  padding?: string;
  margin?: string;
};
export const TextInputStyle = styled(TextInput)<TextInputStyleProps>`
  background-color: ${(props: TextInputStyleProps) =>
    props.backgroundColor ?? '#fff'};
  padding: ${(props: TextInputStyleProps) => props.padding ?? '10px'};
  border: 1px solid #ddd;
  margin: ${(props: TextInputStyleProps) => props.margin ?? 0};
`;
