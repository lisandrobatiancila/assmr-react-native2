export interface ChatList {
  id: number;
  sender_name: string;
  sender_email: string;
  send_date: string;
  message: string;
} // used in a listview

export interface IChatWithModel {
  activeUser: string;
  otherUser: string;
} // gamita ni if gusto makipag chatt ang active user to other users;

export interface IChatWithMessagesModel {
  id: number;
  userId: number;
  message_sender: string;
  message_receiver: string;
  message: string;
} // a fields returned for chatts of between users;

export interface IChatSendMessageModel {
  senderId: number;
  receiverId: number;
  activeUser: string;
  otherUser: string;
  message: string;
} // when sending a message to other user
