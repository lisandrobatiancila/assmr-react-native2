/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CardContainer} from '../../../components/card/Card';
import {TextContainer} from '../../../components/Text/Text';
import {ChatList} from '../../../models/chat-list/MyChats';
import {MessagesService} from '../../../services/messages/MessagesService';
import {useUserContext} from '../../../context/User/UserContext';
import {
  formatDate,
  upperCaseUserFullName,
} from '../../../utils/utilsStandAlone';
import {FlexRow} from '../../../components/Flex-Row/styles';
import {FlexCol} from '../../../components/Flex-Col';
import {TouchableContainer} from '../../../components/Touchable';
import {WHITE_COLOR} from '../../../constants/colorConstant';

const MessageScreen = ({navigation}: any) => {
  const messageService = new MessagesService();
  const userContext = useUserContext();
  const activeUserID = userContext?.userId ?? 0; // 0 means no active user
  const activeUserEmail = userContext?.email ?? 'unknown'; // means no active user
  const [chatList, setChatList] = useState<ChatList[]>([]);
  useEffect(() => {
    getAllMyChatList()
      .then(response => {
        const {data} = response;
        const {code} = data;
        console.log(data);
        setChatList(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function getAllMyChatList() {
    return messageService.getAllMyChatList(activeUserID, activeUserEmail);
  }
  function displayChatList({item}: any) {
    let fullName: string = '';
    let who: string = ''; // it will put a prefix 'You' or ''
    let otherUser: string = ''; //hold the email of other user
    let otherUserId: number = 0;
    if (item.senderMess_email === activeUserEmail) {
      who = 'You: ';
      fullName = upperCaseUserFullName(
        `${item.userReceiver_lastname}, ${item.userReceiver_firstname}`,
      );
      otherUser = item.receiverMess_email;
      otherUserId = item.receiverMess_userId;
    } else {
      fullName = upperCaseUserFullName(
        `${item.userSender_lastname}, ${item.userSender_firstname}`,
      );
      otherUser = item.senderMess_email;
      otherUserId = item.senderMess_userId;
    }
    return (
      <View style={style.displayCLContainer}>
        <CardContainer>
          <TouchableNativeFeedback onPress={() => onOpenChatRoom(otherUser, otherUserId)}>
            <View style={{padding: 10}}>
              <FlexRow>
                <Image
                  source={require('../../../public/images/user.png')}
                  style={style.imageStyle}
                />
                <FlexCol padding={'10px'}>
                  <FlexRow>
                    <TextContainer
                      fontSize={'20px'}
                      textAlign={'left'}
                      text={fullName}
                    />
                    <TextContainer
                      fontSize={'12px'}
                      textAlign={'left'}
                      // text={formatDate(item.date)}
                    />
                  </FlexRow>

                  <FlexRow>
                    <TextContainer fontWeight={'700'} text={who} />
                    <TextContainer textAlign={'left'} text={item.messages_message} />
                  </FlexRow>
                </FlexCol>
              </FlexRow>
            </View>
          </TouchableNativeFeedback>
        </CardContainer>
      </View>
    );
    return <TextContainer text={'wewe'} />;
  }
  function onOpenChatRoom(otherUserEmail: string, otherUserId: number) {    
    navigation.navigate('IChatWith', {userEmail: otherUserEmail, receiverId: otherUserId}); // otherUser
  }
  return (
    <View>
      {chatList.length ? (
        <FlatList data={chatList} renderItem={displayChatList} />
      ) : (
        <View style={style.noMessageContainer}>
          <CardContainer height={'200px'}>
            <TextContainer
              fontSize={'18px'}
              text={'You dont have any messages yet.'}
            />
          </CardContainer>
        </View>
      )}
    </View>
  );
};

export default MessageScreen;

const style = StyleSheet.create({
  noMessageContainer: {
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  displayCLContainer: {
    padding: 10,
  }, // display chattlist container
  imageStyle: {
    width: 50,
    height: 50,
  },
});
