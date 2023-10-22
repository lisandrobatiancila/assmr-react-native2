/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  View,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextContainer} from '../../../components/Text/Text';
import {MyAssumedPropertyService} from '../../../services/asssumed-property/MyAssumedProperty';
import {useUserContext} from '../../../context/User/UserContext';
import {AssumptionInformationModel} from '../../../models/assumed-property/AssumedProperty';
import {CardContainer} from '../../../components/card/Card';
import {TouchableContainer} from '../../../components/Touchable';
import {FlexRow} from '../../../components/Flex-Row/styles';
import {
  APP_COLOR,
  INFO_COLOR,
  MESSAGE_COLOR,
} from '../../../constants/colorConstant';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';

export const AssumedProperty = ({navigation}: any) => {
  const userContext = useUserContext();
  const myAssPropService = new MyAssumedPropertyService();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [assumedPropertyList, setAssumedPropertyList] = useState<
    AssumptionInformationModel[]
  >([]);

  useEffect(() => {
    getMyAssumedVehicleProperty()
      .then(response => {
        const {data} = response;
        setAssumedPropertyList(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refreshing]);
  function getMyAssumedVehicleProperty() {
    return myAssPropService.getAllMyAssumedVehiclePropety(
      userContext?.userId ?? 0,
    );
  }
  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }
  function displayAssumedProperty(param: any) {
    const {item} = param;
    const address = item.vehicle_location;
    return (
      <>
        <CardContainer margin={'0 0 10px 0'}>
          <FlexRow justifyContent={'center'}>
            <Image
              source={require('../../../public/images/user.png')}
              style={style.ownerIMG}
            />
          </FlexRow>
          <View style={style.rootBodyContainer}>
            <FlexRow>
              <TextContainer text={'Owner: '} />
              <TextContainer text={upperCaseUserFullName(item.vehicle_owner)} />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Contactno: '} />
              <TextContainer text={item.user_contactno} />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Address: '} />
              <TextContainer text={address} />
            </FlexRow>
            <FlexRow justifyContent={'center'}>
              <TouchableContainer
                backgroundColor={INFO_COLOR}
                borderRadius={'5px'}
                padding={'10px'}
                margin={'5px 0 0 0'}
                onPress={() => onTriggerActions(item, 'property-info')}>
                <TextContainer color={'#fff'} text={'Property info'} />
              </TouchableContainer>
              <TextContainer text={' '} />
              <TouchableContainer
                backgroundColor={APP_COLOR}
                borderRadius={'5px'}
                padding={'10px'}
                margin={'5px 0 0 0'}
                onPress={() => onTriggerActions(item, 'remove-assumption')}>
                <TextContainer color={'#fff'} text={'Remove assumption'} />
              </TouchableContainer>
              <TextContainer text={' '} />
              <TouchableContainer
                backgroundColor={MESSAGE_COLOR}
                borderRadius={'5px'}
                padding={'10px'}
                margin={'5px 0 0 0'}
                onPress={() => onTriggerActions(item, 'send-message')}>
                <TextContainer color={'#fff'} text={'Message'} />
              </TouchableContainer>
            </FlexRow>
          </View>
        </CardContainer>
      </>
    );
  }
  function onTriggerActions(item: AssumptionInformationModel, action: string) {
    const ID = item.assumption_assumerId;
    const propertyID = item.assumption_property_id;
    switch (action) {
      case 'property-info':
        navigation.navigate('ViewVehicleInfo', {propertyID});
        break;
      case 'remove-assumption':
        Alert.alert(
          'Message',
          'Kindly confirm, if you are sure to cancel your assumption!',
          [
            {
              text: 'Close',
            },
            {
              text: 'Confirm',
              onPress: () => {
                myAssPropService.removeAssumedProperty(ID).then(response => {
                  const {data} = response;
                  const {code, message} = data;

                  if (code !== 200) {
                    Alert.alert('Message', message);
                  } else {
                    Alert.alert('Message', message);
                  }
                });
              },
            },
          ],
        );

        break;
      case 'send-message':
        const {user_id} = item;

        navigation.navigate('IChatWith', {
          userEmail: item.user_email,
          receiverId: user_id,
        });
        break;
      default:
        console.log('No action specified.');
    }
  }
  return (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
      <View style={[style.rootContainer]}>
        {assumedPropertyList.length ? (
          <FlatList
            data={assumedPropertyList}
            renderItem={displayAssumedProperty}
          />
        ) : (
          <View style={style.noAssumptionContainer}>
            <CardContainer height={'200px'} padding={'10px'}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  height: '100%',
                }}>
                <Image
                  source={require('../../../public/images/empty-box.png')}
                  style={{height: 100, width: 100}}
                />
                <TextContainer
                  fontSize={'20px'}
                  text={'You don`t have any assumed properties'}
                />
              </View>
            </CardContainer>
          </View>
        )}
      </View>
    </RefreshControl>
  );
};

const style = StyleSheet.create({
  rootContainer: {
    // width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: APP_COLOR,
  },
  rootBodyContainer: {
    padding: 10,
  },
  ownerIMG: {
    width: 100,
    height: 100,
  },
  noAssumptionContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
