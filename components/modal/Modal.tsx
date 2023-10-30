import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type AssmrModalProps = ViewStyle & {
  padding?: any;
  children: React.ReactNode;
};
const AssmrModal = (props: AssmrModalProps) => {
  return (
    <View style={[style.modalContainer, {padding: props.padding}]}>
      {props.children}
    </View>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default AssmrModal;
