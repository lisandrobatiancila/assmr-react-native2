import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';

type TouchableStyleProps = {
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  backgroundColor?: string;
  margin?: string;
};

export const TouchableStyle = styled(TouchableOpacity)<TouchableStyleProps>`
  width: ${(props: TouchableStyleProps) => props.width ?? 'auto'};
  height: ${(props: TouchableStyleProps) => props.height ?? 'auto'};
  padding: ${(props: TouchableStyleProps) => props.padding ?? 0};
  border: ${(props: TouchableStyleProps) => props.border ?? 0};
  border-radius: ${(props: TouchableStyleProps) => props.borderRadius ?? 0};
  background-color: ${(props: TouchableStyleProps) =>
    props.backgroundColor ?? 'teal'};
  color: ${(props: TouchableStyleProps) => props.color ?? '#000'};
  margin: ${(props: TouchableStyleProps) => props.margin ?? 0};
`;
