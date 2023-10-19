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
  messages_id: number,
  messages_senderId: number,
  messages_receiverId: number,
  messages_receiverMessageId: number,
  messages_senderMessageId: number,
  messages_message: string,
  messages_date: string,
  userSender_id: number,
  userSender_email: string,
  userSender_firstname: string,
  userSender_middlename: string,
  userSender_lastname: string,
  userSender_contactno: string,
  userSender_gender: string,
  userSender_municipality: string,
  userSender_province: string,
  userSender_barangay: string,
  userReceiver_id: number,
  userReceiver_email: string,
  userReceiver_firstname: string,
  userReceiver_middlename: string,
  userReceiver_lastname: string,
  userReceiver_contactno: string,
  userReceiver_gender: string,
  userReceiver_municipality: string,
  userReceiver_province: string,
  userReceiver_barangay: string,
  receiverMess_id: number,
  receiverMess_email: string,
  receiverMess_userId: number,
  senderMess_id: number,
  senderMess_email: string,
  senderMess_userId: number
} // a fields returned for chatts of between users;

export interface IChatSendMessageModel {
  senderId: number;
  receiverId: number;
  activeUser: string;
  otherUser: string;
  message: string;
} // when sending a message to other user
