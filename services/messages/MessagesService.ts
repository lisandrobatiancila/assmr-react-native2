import {
  IChatSendMessageModel,
  IChatWithMessagesModel,
  IChatWithModel,
} from '../../models/chat-list/MyChats';
import ResponseData from '../../models/response/Response';
import {instance} from '../../utils/appUtils';

export class MessagesService {
  iChatWith(
    ichatWith: IChatWithModel,
  ): Promise<ResponseData<IChatWithMessagesModel[]>> {
    return instance.post('messages/iChatWith', ichatWith);
  }
  iSendMessageWith(chatMessage: IChatSendMessageModel) {
    return instance.post('messages/sendMessageWith', chatMessage);
  }
  getAllMyChatList(userId: number, activeUserEmail: string) {
    const param = {userId, activeUserEmail};
    return instance.post('messages/iInteractedWith', param);
  }
}
