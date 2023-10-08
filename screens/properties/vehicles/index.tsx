import React, {useEffect, useState} from 'react';
import {RefreshControl, Image, StyleSheet, Alert} from 'react-native';
import {ViewContainer} from '../../../components/View/View';
import {TextContainer} from '../../../components/Text/Text';
import {BASEURL, instance} from '../../../utils/appUtils';
import {CardContainer} from '../../../components/card/Card';
import {FlatList} from 'react-native-gesture-handler';
import {VehicleAssumption} from '../../../models/my-property/MyProperty';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {TouchableContainer} from '../../../components/Touchable';
import {useUserContext} from '../../../context/User/UserContext';

type VehiclePropertiesProps = {
  navigation: any;
};

export const VehicleProperties = ({navigation}: VehiclePropertiesProps) => {
  const userContext = useUserContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [vehicleList, setVehicleList] = useState<VehicleAssumption[]>([]);

  useEffect(() => {
    instance
      .get('property-assumptions/vehicle-assumption')
      .then((response: any) => {
        let {data} = response;
        data = data.data;
        setVehicleList(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh]);

  const onAssume = (props: any) => {
    const {id, userId} = props;
    if (userId === userContext?.userId) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {propertyID: id, ownerID: userId});
  };
  const onViewPropertyInfo = (props: any) => {
    const {id} = props;

    navigation.navigate('ViewVehicleInfo', {propertyID: id});
  };
  const displayVehicleItem = (vehicleItem: any) => {
    const {item} = vehicleItem;
    const ownerFullName = item.owner;
    const frontIMG = JSON.parse(item.vehicleImages[0].vehicleFrontIMG)[0];

    return (
      <CardContainer
        padding="10px"
        borderRadius="3px"
        backgroundColor="#fff"
        margin={'0 0 5px 0'}>
        <Image
          source={{
            uri: BASEURL + '/' + frontIMG,
          }}
          style={style.IMG}
          alt="Vehicle image"
        />
        <FlexRowContainer>
          <TextContainer text="Owner: " />
          <TextContainer
            text={ownerFullName}
            fontSize={'15px'}
            textTransform="capitalize"
          />
        </FlexRowContainer>
        <FlexRowContainer>
          <TextContainer text="Brand: " />
          <TextContainer fontSize={'15px'} text={item.brand} />
        </FlexRowContainer>
        <FlexRowContainer>
          <TextContainer text="Model: " />
          <TextContainer text={item.model} />
        </FlexRowContainer>
        <FlexRowContainer>
          <TouchableContainer
            width={'50%'}
            backgroundColor="#50C878"
            padding={'10px'}
            borderRadius={'5px'}
            onAssume={() => onAssume(item)}>
            <TextContainer text="Assume" color={'#fff'} />
          </TouchableContainer>
          <TextContainer text={' '} />
          <TouchableContainer
            width={'50%'}
            borderRadius={'5px'}
            padding={'10px'}
            onAssume={() => onViewPropertyInfo(item)}>
            <TextContainer text="View" color={'#fff'} />
          </TouchableContainer>
        </FlexRowContainer>
      </CardContainer>
    );
  };
  function onRefresh() {
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  return (
    <RefreshControl refreshing={refresh} onRefresh={onRefresh}>
      <ViewContainer padding="0">
        <FlatList data={vehicleList} renderItem={displayVehicleItem} />
      </ViewContainer>
    </RefreshControl>
  );
};

const style = StyleSheet.create({
  IMG: {
    width: 'auto',
    height: 150,
    zIndex: -1,
  },
});
