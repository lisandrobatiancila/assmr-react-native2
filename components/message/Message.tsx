import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

type StandAloneMessageProps = {
  navigation: any;
  email: string;
  receiverId: number;
};
export const StandAloneMessageComponent = ({
  navigation,
  email,
  receiverId,
}: StandAloneMessageProps) => {
  const onSendMessage = () => {
    console.log(email);
    navigation.navigate('IChatWith', {
      userEmail: email,
      receiverId: receiverId,
    });
  };
  return (
    <TouchableOpacity style={style.messageStyle} onPress={onSendMessage}>
      <Image
        source={require('../../public/images/message2.png')}
        style={{width: 50, height: 50}}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  messageStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    right: 0,
    marginRight: 20,
  },
});
