/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  ToastAndroid,
  FlatList,
  View,
  Image,
} from 'react-native';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {CardContainer} from '../../../../components/card/Card';
import {FlexCol} from '../../../../components/Flex-Col';
import {FlexRow} from '../../../../components/Flex-Row/styles';
import {TextContainer} from '../../../../components/Text/Text';
import {
  upperCaseUserFullName,
  upperCaseWord,
} from '../../../../utils/utilsStandAlone';
import {TouchableContainer} from '../../../../components/Touchable';
import {
  APP_COLOR,
  MESSAGE_COLOR,
  WHITE_COLOR,
} from '../../../../constants/colorConstant';
import {DividerContainer} from '../../../../components/Divider/Divider';
import {AssumerListModel} from '../../../../models/my-property/MyProperty';

export const DisplayAssumerList = (props: any) => {
  const {propertyId} = props.route.params;
  const [refresh, setRefresh] = useState<boolean>(false);
  const [assumerList, setAssumerList] = useState<AssumerListModel[]>([]);

  const propertyService = new MyPropertyService();
  useEffect(() => {
    try {
      getAssumerList();
    } catch (err) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  }, [refresh]);

  const onRefreshing = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  async function getAssumerList() {
    const resp = await propertyService.listAssumerOfMyProperty(propertyId);
    const {data} = resp.data;
    setAssumerList(data);
  }
  const onGoToMessage = (item: AssumerListModel) => {
    const {user_id, user_email} = item;

    props.navigation.navigate('IChatWith', {
      userEmail: user_email,
      receiverId: user_id,
    });
  };
  function displayAssumerLists({item}: any) {
    return (
      <View style={{padding: 10}}>
        <CardContainer padding={'10px'}>
          <FlexCol>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../../public/images/user.png')}
                style={{width: 70, height: 70}}
              />
            </View>
          </FlexCol>
          <View style={{marginTop: 20, paddingLeft: 5}}>
            <FlexRow>
              <TextContainer text={'Name: '} />
              <TextContainer
                text={upperCaseUserFullName(
                  `${item.user_lastname}, ${item.user_firstname}`,
                )}
              />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Contact#: '} />
              <TextContainer text={item.user_contactno} />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Work: '} />
              <TextContainer
                text={upperCaseWord(item.assumer_assumer_work)}
                fontSize={'18px'}
                fontWeight={'500'}
              />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Address: '} />
              <TextContainer
                text={`${item.user_barangay}, ${item.user_province}, ${item.user_municipality}`}
              />
            </FlexRow>
            <DividerContainer margin={5} />
            <FlexRow justifyContent={'center'}>
              <TouchableContainer
                backgroundColor={APP_COLOR}
                padding={'10px'}
                borderRadius={'5px'}>
                <TextContainer text={'Remove'} color={WHITE_COLOR} />
              </TouchableContainer>
              <DividerContainer margin={5} />
              <TouchableContainer
                onPress={() => onGoToMessage(item)}
                backgroundColor={MESSAGE_COLOR}
                fontSize={'18px'}
                padding={'10px'}
                borderRadius={'5px'}>
                <TextContainer
                  text={'Message'}
                  color={WHITE_COLOR}
                  fontSize={'18px'}
                />
              </TouchableContainer>
            </FlexRow>
          </View>
        </CardContainer>
      </View>
    );
  }
  return (
    <RefreshControl refreshing={refresh} onRefresh={onRefreshing}>
      <FlatList data={assumerList} renderItem={displayAssumerLists} />
    </RefreshControl>
  );
};
