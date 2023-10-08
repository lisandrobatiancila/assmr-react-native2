import React from 'react';
import {View} from 'react-native';
import {CardContainer} from '../../../../components/card/Card';
import {TextContainer} from '../../../../components/Text/Text';

export function ViewMyVehicle() {
  return (
    <View>
      <CardContainer>
        <TextContainer text={'data'} />
      </CardContainer>
    </View>
  );
}
