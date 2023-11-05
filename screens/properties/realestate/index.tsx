/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  Image,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ViewContainer} from '../../../components/View/View';
import {TextContainer} from '../../../components/Text/Text';
import {BASEURL, instance} from '../../../utils/appUtils';
import {CardContainer} from '../../../components/card/Card';
import {FlatList} from 'react-native-gesture-handler';
import {RealestateAssumption} from '../../../models/my-property/MyProperty';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {TouchableContainer} from '../../../components/Touchable';
import {useUserContext} from '../../../context/User/UserContext';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';

type RealestatePropertiesProps = {
  navigation: any;
  filterOptions: any;
};

export const RealestateProperties = ({
  navigation,
  filterOptions,
}: RealestatePropertiesProps) => {
  const userContext = useUserContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [realestateList, setRealestateList] = useState<RealestateAssumption[]>(
    [],
  );
  console.log(filterOptions);
  useEffect(() => {
    instance
      .post('property-assumptions/realestate-assumption', filterOptions)
      .then((response: any) => {
        let {data} = response;
        data = data.data;
        setRealestateList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh, filterOptions]);
  function onSelectAction(realestate: any, actionType: string) {
    const {realestate_propertyId} = realestate;
    if (userContext?.userId) {
      if (userContext.userId === realestate.user_id) {
        Alert.alert('Invalid Action', 'You can not send inquiries to yourself');
        return;
      }
    }
    switch (actionType) {
      case 'inquire-property':
        navigation.navigate('InquireProperty', {
          userReceiverId: realestate.user_id,
          propertyId: realestate_propertyId,
        });
        break;
      default:
        console.log('no actionType');
    }
    // navigation.navigate("ViewMyVehicle")
  }
  const onAssume = (props: any) => {
    const {realestate_propertyId, user_id, user_email} = props;
    console.log(props);
    if (user_id === userContext?.userId) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {
      propertyID: realestate_propertyId,
      ownerID: user_id,
      userEmail: user_email,
    });
  };
  const onViewPropertyInfo = (props: any) => {
    const {realestate_propertyId} = props;
    navigation.navigate('ViewRealestateInfo', {
      propertyID: realestate_propertyId,
      realestateType: filterOptions.realestateType,
      triggeredFrom: 'properties-view',
    });
  };

  const displayRealestateItem = (realestateItem: any) => {
    const {item} = realestateItem;
    const ownerFullName = item.realestate_owner;
    let frontIMG: string = '';

    if (item.realestate_realestateType === 'house and lot') {
      frontIMG = JSON.parse(item.hal_hal_front_image)[0];
    } else if (item.realestate_realestateType === 'house') {
      frontIMG = JSON.parse(item.house_house_front_image)[0];
    } else {
      frontIMG = JSON.parse(item.lot_lot_image)[0];
    }

    return (
      <CardContainer
        padding="10px"
        borderRadius="3px"
        backgroundColor="#fff"
        margin={'0 0 5px 0'}>
        <View style={{position: 'relative'}}>
          <Image
            source={{
              uri: BASEURL + '/' + frontIMG,
            }}
            style={style.IMG}
            alt="Vehicle image"
          />
          <View style={{position: 'absolute', top: 0, right: 0}}>
            <TouchableOpacity
              style={[
                {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  position: 'relative',
                  alignContent: 'flex-end',
                  alignSelf: 'flex-end',
                },
              ]}>
              <Menu>
                <MenuTrigger
                  children={
                    <View>
                      <View style={style.dotCircleContainer}>
                        <View
                          style={{
                            position: 'absolute',
                            right: 20,
                            width: 40,
                            height: 40,
                            backgroundColor: '#fff',
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View style={[style.dotCircle]}>
                            <Text>1</Text>
                          </View>
                          <View style={[style.dotCircle]}>
                            <Text>2</Text>
                          </View>
                          <View style={[style.dotCircle]}>
                            <Text>3</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  }
                />

                <MenuOptions>
                  <MenuOption
                    text="Inquire"
                    style={style.menuOptPadd}
                    onSelect={() => onSelectAction(item, 'inquire-property')}
                  />
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <FlexRowContainer>
              <TextContainer text="Type: " />
              <TextContainer
                text={upperCaseUserFullName(item.realestate_realestateType)}
                fontSize={'15px'}
                textTransform="capitalize"
              />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Owner: " />
              <TextContainer
                text={ownerFullName}
                fontSize={'15px'}
                textTransform="capitalize"
              />
            </FlexRowContainer>
            {item.realestate_realestateType !== 'lot' && (
              <FlexRowContainer>
                <TextContainer text="Developer: " />
                <TextContainer
                  fontSize={'15px'}
                  text={
                    item.realestate_realestateType === 'house and lot'
                      ? item.hal_developer
                      : item.house_developer
                  }
                />
              </FlexRowContainer>
            )}
          </View>
          <FlexRowContainer>
            <TouchableContainer
              width={'50%'}
              backgroundColor="#50C878"
              padding={'10px'}
              borderRadius={'5px'}
              onPress={() => onAssume(item)}>
              <TextContainer text="Assume" color={'#fff'} />
            </TouchableContainer>
            <TextContainer text={' '} />
            <TouchableContainer
              width={'50%'}
              borderRadius={'5px'}
              padding={'10px'}
              onPress={() => onViewPropertyInfo(item)}>
              <TextContainer text="View" color={'#fff'} />
            </TouchableContainer>
          </FlexRowContainer>
        </View>
      </CardContainer>
    );
  };
  function onRefreshControl() {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  return (
    <RefreshControl refreshing={refresh} onRefresh={onRefreshControl}>
      <ViewContainer padding="0">
        <FlatList data={realestateList} renderItem={displayRealestateItem} />
      </ViewContainer>
    </RefreshControl>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginTop: 10,
    position: 'relative',
  },
  IMG: {
    width: 'auto',
    height: 150,
    zIndex: -1,
  },
  dotCircleContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  menuOptPadd: {
    padding: 10,
  },
  dotCircle: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 100,
    marginTop: 1,
  },
});
