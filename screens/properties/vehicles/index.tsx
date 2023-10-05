import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {ViewContainer} from '../../../components/View/View';
import {TextContainer} from '../../../components/Text/Text';
import {instance} from '../../../utils/appUtils';
import {CardContainer} from '../../../components/card/Card';
import {FlatList} from 'react-native-gesture-handler';

export const VehicleProperties = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [vehicleList, setVehicleList] = useState<any>();

  useEffect(() => {
    instance
      .get('property-assumptions/vehicle-assumption')
      .then((response: any) => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const displayVehicleItem = () => {
    return (
      <CardContainer padding="10px" borderRadius="3px" backgroundColor="red">
        <TextContainer text="data" fontSize="20px" textTransform="none" />
      </CardContainer>
    );
  };
  return (
    <RefreshControl refreshing={refresh}>
      <ViewContainer padding="10px">
        <FlatList data={vehicleList} renderItem={displayVehicleItem} />
      </ViewContainer>
    </RefreshControl>
  );
};
