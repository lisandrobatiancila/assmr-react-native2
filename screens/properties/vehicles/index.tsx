import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {ViewContainer} from '../../../components/View/View';
import {TextContainer} from '../../../components/Text/Text';
import {instance} from '../../../utils/appUtils';

export const VehicleProperties = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  console.log('okaysss');

  useEffect(() => {
    instance
      .get('property-assumptions/vehicle-assumption')
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }, []);

  return (
    <RefreshControl>
      <ViewContainer padding="10px">
        <TextContainer text="data" fontSize="20px" textTransform="none" />
      </ViewContainer>
    </RefreshControl>
  );
};
