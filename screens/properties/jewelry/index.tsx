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
import {VehicleAssumption} from '../../../models/my-property/MyProperty';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {TouchableContainer} from '../../../components/Touchable';
import {useUserContext} from '../../../context/User/UserContext';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

type JewelryPropertiesProps = {
  navigation: any;
  filterOptions: any;
};

export const JewelryProperties = ({
  navigation,
  filterOptions,
}: JewelryPropertiesProps) => {
  const userContext = useUserContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [jewelryList, setJewelryList] = useState<VehicleAssumption[]>([]);
  console.log('properties/jewelry/::39' + JSON.stringify(filterOptions));
  useEffect(() => {
    instance
      .post('property-assumptions/jewelry-assumption', filterOptions)
      .then((response: any) => {
        let {data} = response;
        data = data.data;

        setJewelryList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh, filterOptions]);
  function onSelectAction(jewelry: any, actionType: string) {
    const {jewelry_propertyId} = jewelry;
    if (userContext?.userId) {
      if (userContext.userId === jewelry.user_id) {
        Alert.alert('Invalid Action', 'You can not send inquiries to yourself');
        return;
      }
    }
    switch (actionType) {
      case 'inquire-property':
        navigation.navigate('InquireProperty', {
          userReceiverId: jewelry.user_id,
          propertyId: jewelry_propertyId,
        });
        break;
      default:
        console.log('no actionType');
    }
    // navigation.navigate("ViewMyVehicle")
  }
  const onAssume = (props: any) => {
    const {jewelry_propertyId, user_id, user_email} = props;
    if (user_id === userContext?.userId) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {
      propertyID: jewelry_propertyId,
      ownerID: user_id,
      userEmail: user_email,
    });
  };
  const onViewPropertyInfo = (props: any) => {
    const {jewelry_propertyId} = props;
    console.log(props);
    navigation.navigate('ViewJewelryInfo', {
      propertyID: jewelry_propertyId,
      triggeredFrom: 'properties-view',
    });
  };

  const displayJewelryItem = (jewelryItem: any) => {
    const {item} = jewelryItem;
    const ownerFullName = `${item.user_lastname}, ${item.user_firstname}`;
    const frontIMG = JSON.parse(item.jewelry_jewelry_image)[0];

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
              <TextContainer text="Owner: " />
              <TextContainer
                text={ownerFullName}
                fontSize={'15px'}
                textTransform="capitalize"
              />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Name: " />
              <TextContainer
                fontSize={'15px'}
                text={item.jewelry_jewelry_name}
              />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Model: " />
              <TextContainer text={item.jewelry_jewelry_model} />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Karat: " />
              <TextContainer text={item.jewelry_jewelry_karat} />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Grams: " />
              <TextContainer text={item.jewelry_jewelry_grams} />
            </FlexRowContainer>
            <FlexRowContainer>
              <TextContainer text="Material: " />
              <TextContainer text={item.jewelry_jewelry_material} />
            </FlexRowContainer>
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
        <FlatList data={jewelryList} renderItem={displayJewelryItem} />
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
