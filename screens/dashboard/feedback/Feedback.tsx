/* eslint-disable handle-callback-err */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  Alert,
  ToastAndroid,
  RefreshControl,
  Image,
} from 'react-native';
import {TouchableContainer} from '../../../components/Touchable';
import {TextContainer} from '../../../components/Text/Text';
import {
  APP_COLOR,
  INFO_COLOR,
  WHITE_COLOR,
} from '../../../constants/colorConstant';
import AssmrModal from '../../../components/modal/Modal';
import {useModalContext} from '../../../context/Modal/ModalContext';
import {CardContainer} from '../../../components/card/Card';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlexRow} from '../../../components/Flex-Row/styles';
import {DividerContainer} from '../../../components/Divider/Divider';
import {TextInputContainer} from '../../../components/TextInput/TextInput';
import {UserFeedBacksModel} from '../../../models/feedbacks/FeedBacks';
import {useUserContext} from '../../../context/User/UserContext';
import {
  formatDate,
  upperCaseUserFullName,
} from '../../../utils/utilsStandAlone';
import {FeedBackService} from '../../../services/feedback/FeedBackService';
import {FlexCol} from '../../../components/Flex-Col';

const FeedBackScreen = () => {
  const feedBackService = new FeedBackService();
  const modalContext = useModalContext();
  const userContext = useUserContext();
  const userFullName = upperCaseUserFullName(
    `${userContext?.lastname}, ${userContext?.firstname} ${userContext?.middlename}`,
  );
  const userId = userContext?.userId;
  const userEmail = userContext?.email;

  const [userFeedsComment, setUserFeedsComment] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);
  const [feedBackLists, setFeedBackLists] = useState<UserFeedBacksModel[]>([]);

  useEffect(() => {
    modalContext?.setIsOpenedModal(false);
    getAllUserFeedBacks()
      .then(response => {
        const {data}: any = response;
        const {code} = data;
        if (code !== 200) {
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
          return;
        }
        setFeedBackLists(data.data);
      })
      .catch(err => {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      });
  }, [refresh]);

  const feedbackItems: {label: string; value: string}[] = [
    {
      label: 'Yes',
      value: 'Satisfied.',
    },
    {
      label: 'No',
      value: 'Not Satisfied.',
    },
  ];
  const [feedbackValue, setFeedBackValue] = useState<string | null>(
    'Satisfied',
  );
  const [feedbackOpen, setFeedBackOpen] = useState<boolean>(false);

  const onGiveFeedBacks = () => {
    console.log(modalContext?.isOpenedModal);
    // modalContext?.setIsOpenedModal(true);
  };
  const onCloseModal = () => {
    modalContext?.setIsOpenedModal(false);
  };
  const onChangeFeedBackInput = (param: any) => {
    setUserFeedsComment(param);
  };
  const displayAccumulatedFeedBacks = ({item}: any) => {
    return (
      <View style={{padding: 10}}>
        <CardContainer padding={'10px'} height={'200px'}>
          <FlexCol>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../public/images/user.png')}
                style={{height: 80, width: 80}}
              />
            </View>
            <View style={{marginTop: 10}}>
              <TextContainer
                text={formatDate(item.feedBackDate)}
                fontSize={'18px'}
                fontWeight={'600'}
              />
              <TextContainer text={userContext?.email} />
              <TextContainer text={item.fullName} />
              <TextContainer
                text={`"${item.userComments}"`}
                fontWeight={'500'}
              />
            </View>
          </FlexCol>
        </CardContainer>
      </View>
    );
  };
  const onSubmitFeedBacks = async () => {
    const userFeedsParams: UserFeedBacksModel = {
      userId: userId ?? 0,
      email: userEmail ?? 'no email',
      fullName: userFullName,
      feedComments: userFeedsComment,
      satisfaction: feedbackValue ?? 'no satisfaction',
    };
    const feedBackResp = await feedBackService.sendUserFeedBacks(
      userFeedsParams,
    );
    const {code, data}: any = feedBackResp.data;
    if (code !== 200) {
      ToastAndroid.show('Someting went wrong', ToastAndroid.LONG);
    } else {
      ToastAndroid.show(data, ToastAndroid.SHORT);
    }
    modalContext?.setIsOpenedModal(false);
    setUserFeedsComment('');
  };
  function getAllUserFeedBacks() {
    return feedBackService.getAllUserFeedBacks();
  }
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const displayFeedBackModal = ({item}: any) => {
    return (
      <View style={style.viewRootContainer}>
        <View style={style.viewFeedBackListContainer}>
          {modalContext?.isOpenedModal ? (
            <AssmrModal padding={10}>
              <CardContainer padding={'10px'}>
                <TextContainer
                  text={'Are we usefull?, But we are not usefull.'}
                  fontWeight={'600'}
                  fontSize={'20px'}
                />
                <View style={style.viewFeedBackContent}>
                  <TextContainer
                    text={'Are you satisfied?'}
                    textAlign={'left'}
                    fontSize={'18px'}
                  />
                  <DividerContainer margin={5} />
                  <DropDownPicker
                    open={feedbackOpen}
                    value={feedbackValue}
                    items={feedbackItems}
                    setValue={setFeedBackValue}
                    setOpen={setFeedBackOpen}
                  />
                  <TextInputContainer
                    style={{textAlignVertical: 'top', textAlign: 'auto'}}
                    margin={'10px 0 0 0'}
                    multiline
                    height={200}
                    padding={'10px'}
                    onChangeText={(e: any) => onChangeFeedBackInput(e)}
                    placeholder={'Feedbacks...'}
                    value={userFeedsComment}
                  />
                  <FlexRow style={{justifyContent: 'center', padding: 10}}>
                    <TouchableContainer
                      padding={'10px'}
                      borderRadius={'5px'}
                      margin={'5px 0 0 0'}
                      backgroundColor={INFO_COLOR}
                      onPress={onSubmitFeedBacks}>
                      <TextContainer
                        color={WHITE_COLOR}
                        fontSize={'18px'}
                        text={'submit feedback'}
                        textTransform={'capitalize'}
                      />
                    </TouchableContainer>
                    <DividerContainer padding={5} />
                    <TouchableContainer
                      padding={'10px'}
                      borderRadius={'5px'}
                      margin={'5px 0 0 0'}
                      backgroundColor={APP_COLOR}
                      onPress={onCloseModal}>
                      <TextContainer
                        color={WHITE_COLOR}
                        fontSize={'18px'}
                        text={'close'}
                        textTransform={'capitalize'}
                      />
                    </TouchableContainer>
                  </FlexRow>
                </View>
              </CardContainer>
            </AssmrModal>
          ) : (
            <View style={{height: '100%', marginBottom: 50}}>
              <FlatList
                data={feedBackLists}
                renderItem={displayAccumulatedFeedBacks}
              />
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <RefreshControl refreshing={refresh} onRefresh={onRefresh}>
      <View style={{height: '100%'}}>
        <FlatList data={[1]} renderItem={displayFeedBackModal} />
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          {!modalContext?.isOpenedModal && (
            <TouchableContainer
              padding={'15px 10px'}
              backgroundColor={APP_COLOR}
              onPress={onGiveFeedBacks}>
              <TextContainer
                text={'give feedback'}
                color={WHITE_COLOR}
                textTransform={'capitalize'}
                fontSize={'18px'}
              />
            </TouchableContainer>
          )}
        </View>
      </View>
    </RefreshControl>
  );
};

export default FeedBackScreen;

const style = StyleSheet.create({
  viewRootContainer: {
    justifyContent: 'space-evenly',
  },
  viewFeedBackListContainer: {
    height: '100%',
  },
  viewFeedBackContent: {
    // marginTop: 10,
  },
});
