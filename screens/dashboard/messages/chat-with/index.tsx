/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, FlatList} from 'react-native';
import {useUserContext} from '../../../../context/User/UserContext';
import {MessagesService} from '../../../../services/messages/MessagesService';
import {
  IChatSendMessageModel,
  IChatWithMessagesModel,
} from '../../../../models/chat-list/MyChats';
import {TextInputContainer} from '../../../../components/TextInput/TextInput';
import {TextContainer} from '../../../../components/Text/Text';
import {TouchableContainer} from '../../../../components/Touchable';
import {INFO_COLOR, WHITE_COLOR} from '../../../../constants/colorConstant';
import {ActiveUser, OtherUser} from './fragemnt';

export function ChatWithOtherUser({route}: any) {
  const {userEmail, receiverId} = route.params; // other user
  console.log(userEmail, receiverId);
  const userContext = useUserContext(); // active user
  const messageService = new MessagesService();
  const [messageList, setMessageList] = useState<IChatWithMessagesModel[]>([]);
  const [textMessage, setTextMessage] = useState<string>('');

  const [onRefresh, setOnRefresh] = useState<false>(false);
  useEffect(() => {
    getIChatWithUser(userContext?.email ?? 'unknown', userEmail)
      .then(response => {
        const {data} = response;
        const {code} = data;
        if (code === 205) {
          setMessageList([]);
        } else {
          setMessageList(data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  function getIChatWithUser(activeUser: string, otherUser: string) {
    return messageService.iChatWith({activeUser, otherUser});
  }
  function onSendMessage() {
    const messageData: IChatSendMessageModel = {
      senderId: userContext?.userId ?? 0,
      message: textMessage,
      activeUser: userContext?.email ?? 'unknown',
      otherUser: userEmail,
      receiverId: receiverId,
    };

    messageService
      .iSendMessageWith(messageData)
      .then((response: any) => {
        const {data} = response;
        const {code, message} = data;

        if (code === 200) {
          setTextMessage('');
        } else {
          Alert.alert('Message', message);
        }
      })
      .catch(err => {
        Alert.alert('Oops', err.message);
      });
  }
  function displayMessages({item}: any) {
    return (
      <View style={style.displayCardContainer}>
        {item.senderMess_email === userContext?.email ? (
          <ActiveUser
            name={userContext?.firstname ?? 'unknown'}
            message={item.messages_message}
            date={item.messages_date}
          /> // go right
        ) : (
          <OtherUser
            name={item.message_sender}
            message={item.messages_message}
            date={item.messages_date}
          /> // go left
        )}
      </View>
    );
  }
  return (
    <View style={style.rootTopContainer}>
      <View style={{height: '85%'}}>
        <FlatList data={messageList} renderItem={displayMessages} />
      </View>
      <View style={style.textInptContainer}>
        <TextInputContainer
          multiline={true}
          width={'80%'}
          value={textMessage}
          onChangeText={setTextMessage}
          placeholder={'Message...'}
        />
        <TouchableContainer
          backgroundColor={INFO_COLOR}
          padding={'10px'}
          width={'20%'}
          onPress={onSendMessage}>
          <TextContainer color={WHITE_COLOR} text={'Send'} />
        </TouchableContainer>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  displayCardContainer: {
    padding: 5,
  },
  rootTopContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  textInptContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    padding: 5,
    bottom: 0,
  },
  textInputMSSG: {
    position: 'absolute',
    bottom: 0,
  },
});
