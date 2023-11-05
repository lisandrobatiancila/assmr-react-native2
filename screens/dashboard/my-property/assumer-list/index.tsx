/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  ToastAndroid,
  FlatList,
  View,
  Image,
  Alert,
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
  INFO_COLOR,
  MESSAGE_COLOR,
  WHITE_COLOR,
} from '../../../../constants/colorConstant';
import {DividerContainer} from '../../../../components/Divider/Divider';
import {AssumerListModel} from '../../../../models/my-property/MyProperty';
import {EmptyRecord} from '../../../../components/EmptRec/EmptyRecord';

export const DisplayAssumerList = (props: any) => {
  const {propertyId, propType} = props.route.params;
  const [refresh, setRefresh] = useState<boolean>(false);
  const [assumerList, setAssumerList] = useState<AssumerListModel[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  const propertyService = new MyPropertyService();
  useEffect(() => {
    try {
      getAssumerList();
    } catch (err) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  }, [refresh, shouldRefetch]);

  const onRefreshing = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  async function getAssumerList() {
    const resp = await propertyService.listAssumerOfMyProperty(
      propertyId,
      propType,
    );
    const {data} = resp.data;
    setAssumerList(data);
  }
  const onPropertyOwnerActions = (key: string, item: AssumerListModel) => {
    switch (key) {
      case 'message':
        const {user_id, user_email} = item;

        props.navigation.navigate('IChatWith', {
          userEmail: user_email,
          receiverId: user_id,
        });
        break;
      case 'remove-assumer':
        const {assumer_id} = item;
        const {user_lastname, user_firstname} = item;
        const assumerFullName = upperCaseUserFullName(
          user_lastname + ', ' + user_firstname,
        );
        Alert.alert(
          'Remove Assumer',
          `Are you sure you want to remove ${assumerFullName}`,
          [
            {
              text: 'Cancel',
            },
            {
              text: 'Yes',
              onPress: () => onRemoveAssumer(assumer_id),
            },
          ],
        );
        break;
      case 'accept-assumer':
        break;
      default:
        console.log('No key.');
    }
  };
  async function onRemoveAssumer(assumerId: number) {
    const response = await propertyService.removeAssumer(assumerId);
    const {code, data} = response.data;
    if (code === 200) {
      ToastAndroid.show(data, ToastAndroid.SHORT);
      setShouldRefetch(true);
    }
  }
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
                onPress={() => onPropertyOwnerActions('remove-assumer', item)}
                backgroundColor={APP_COLOR}
                padding={'10px'}
                borderRadius={'5px'}>
                <TextContainer text={'Remove'} color={WHITE_COLOR} />
              </TouchableContainer>
              <DividerContainer margin={5} />
              <TouchableContainer
                onPress={() => onPropertyOwnerActions('accept-assumer', item)}
                backgroundColor={INFO_COLOR}
                padding={'10px'}
                borderRadius={'5px'}>
                <TextContainer text={'Accept'} color={WHITE_COLOR} />
              </TouchableContainer>
              <DividerContainer margin={5} />
              <TouchableContainer
                onPress={() => onPropertyOwnerActions('message', item)}
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
      <View style={{backgroundColor: APP_COLOR, height: '100%'}}>
        {assumerList.length > 0 && (
          <FlatList data={assumerList} renderItem={displayAssumerLists} />
        )}
        {assumerList.length === 0 && <EmptyRecord />}
      </View>
    </RefreshControl>
  );
};
